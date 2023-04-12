// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "forge-std/Vm.sol";
import "contracts/TokenPayable.sol";
import "contracts/Token.sol";

contract TokenPayableTest is Test {
    TokenPayable private token_payable;
    Token private token;

    address public owner;
    address public token_payable_address;
    address public token_address;

    function setUp() public {
        vm.startPrank(address(8));
        token = new Token();
        token_address = address(token);

        assertEq(token.balanceOf(address(8)), 50);
        vm.stopPrank();

        owner = address(7);
        vm.startPrank(owner);

        token_payable = new TokenPayable(token_address);
        token_payable_address = address(token_payable);

        vm.stopPrank();
    }

    function testInitializeOwner() public {
        assertEq(token_payable.owner(), owner);
    }

    function testOwnerTransferOwnership() public {
        vm.prank(owner);
        token_payable.transferOwnership(address(1));
        assertEq(address(1), token_payable.owner());
    }

    function testNotOwnerTransferOwnership() public {
        vm.prank(address(1));
        vm.expectRevert("Ownable: caller is not the owner");
        token_payable.transferOwnership(address(1));
        assertEq(owner, token_payable.owner());
    }

    function testSuccessfulDeposit() public {
        vm.startPrank(address(8));
        token.approve(token_payable_address, 5);
        token_payable.depositTokens(5);

        assertEq(token_payable.getTokenBalance(), 5);
        assertEq(token.balanceOf(address(8)), 45);
        vm.stopPrank();
    }

    function testSuccessfulWithdraw() public {
        // supply contract with tokens
        vm.startPrank(address(8));
        token.approve(token_payable_address, 10);
        token_payable.depositTokens(10);
        vm.stopPrank();

        vm.startPrank(owner);
        token_payable.approveToken(8);
        token_payable.withdrawTokens(8, address(2));
        assertEq(token_payable.getTokenBalance(), 2);
        assertEq(token.balanceOf(address(2)), 8);
        vm.stopPrank();
    }

    function testNotOwnerWithdraw() public {
        vm.prank(address(1));
        vm.expectRevert("Ownable: caller is not the owner");
        token_payable.withdrawTokens(5, address(2));
    }

    function testWithdrawReceiverZeroAddress() public {
        vm.prank(owner);
        vm.expectRevert("TokenPayable: receiver is zero address");
        token_payable.withdrawTokens(5, address(0));
    }

    function testWithdrawInvalidAmount() public {
        // supply contract with tokens
        vm.startPrank(address(8));
        token.approve(token_payable_address, 10);
        token_payable.depositTokens(10);
        vm.stopPrank();

        vm.prank(owner);
        vm.expectRevert("TokenPayable: Not enough balance to withdraw");
        token_payable.withdrawTokens(12, address(1));
    }

    function testWithdrawUnapprovedAmount() public {
        // supply contract with tokens
        vm.startPrank(address(8));
        token.approve(token_payable_address, 10);
        token_payable.depositTokens(10);
        vm.stopPrank();

        vm.prank(owner);
        vm.expectRevert("ERC20: insufficient allowance");
        token_payable.withdrawTokens(10, address(1));
    }

    function testSuccessfulWithdrawAllTokens() public {
        // supply contract with tokens
        vm.startPrank(address(8));
        token.approve(token_payable_address, 21);
        token_payable.depositTokens(21);
        vm.stopPrank();

        vm.startPrank(owner);
        token_payable.approveToken(21);
        token_payable.withdrawAllTokens();
        assertEq(token_payable.getTokenBalance(), 0);
        assertEq(token.balanceOf(address(owner)), 21);
        vm.stopPrank();
    }

    function testNotOwnerWithdrawAllTokens() public {
        vm.prank(address(1));
        vm.expectRevert("Ownable: caller is not the owner");
        token_payable.withdrawAllTokens();
    }

    function testWithdrawAllNoBalanceTokens() public {
        vm.prank(owner);
        vm.expectRevert("TokenPayable: No balance to withdraw");
        token_payable.withdrawAllTokens();
    }

    function testWithdrawAllTokensUnapprovedAmount() public {
        // supply contract with tokens
        vm.startPrank(address(8));
        token.approve(token_payable_address, 30);
        token_payable.depositTokens(30);
        vm.stopPrank();

        vm.prank(owner);
        vm.expectRevert("ERC20: insufficient allowance");
        token_payable.withdrawAllTokens();
    }

    function testGetTokenBalance() public {
        // supply contract with tokens
        vm.startPrank(address(8));
        token.approve(token_payable_address, 37);
        token_payable.depositTokens(37);
        vm.stopPrank();

        assertEq(token_payable.getTokenBalance(), 37);
    }
}
