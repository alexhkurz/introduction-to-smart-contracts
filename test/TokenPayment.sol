// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "forge-std/Vm.sol";
import "contracts/TokenPayment.sol";
import "contracts/Token.sol";

contract TokenPaymentTest is Test {
    TokenPayment private token_payment;
    Token private token;

    address public owner;
    address public token_payment_address;
    address public token_address;

    function setUp() public {
        vm.startPrank(address(8));
        token = new Token();
        token_address = address(token);

        assertEq(token.balanceOf(address(8)), 50);
        vm.stopPrank();

        owner = address(7);
        vm.startPrank(owner);

        token_payment = new TokenPayment(token_address);
        token_payment_address = address(token_payment);

        vm.stopPrank();
    }

    function testInitializeOwner() public {
        assertEq(token_payment.owner(), owner);
    }

    function testOwnerTransferOwnership() public {
        vm.prank(owner);
        token_payment.transferOwnership(address(1));
        assertEq(address(1), token_payment.owner());
    }

    function testNotOwnerTransferOwnership() public {
        vm.prank(address(1));
        vm.expectRevert("Ownable: caller is not the owner");
        token_payment.transferOwnership(address(1));
        assertEq(owner, token_payment.owner());
    }

    function testSuccessfulDeposit() public {
        vm.startPrank(address(8));
        token.approve(token_payment_address, 5);
        token_payment.depositTokens(5);

        assertEq(token_payment.getTokenBalance(), 5);
        assertEq(token.balanceOf(address(8)), 45);
        vm.stopPrank();
    }

    // function testInvalidDepositAmount() public {
    //     vm.deal(address(1), 0.5 ether);
    //     vm.prank(address(1));
    //     vm.expectRevert(
    //         "TreasuryToken: Deposit amount should be greater than zero"
    //     );
    //     token_payment.deposit{value: 0 ether}();
    // }

    function testSuccessfulWithdraw() public {
        // supply contract with tokens
        vm.startPrank(address(8));
        token.approve(token_payment_address, 10);
        token_payment.depositTokens(10);
        vm.stopPrank();

        vm.startPrank(owner);
        token_payment.approveToken(8);
        token_payment.withdrawTokens(8, address(2));
        assertEq(token_payment.getTokenBalance(), 2);
        assertEq(token.balanceOf(address(2)), 8);
        vm.stopPrank();
    }

    function testNotOwnerWithdraw() public {
        vm.prank(address(1));
        vm.expectRevert("Ownable: caller is not the owner");
        token_payment.withdrawTokens(5, address(2));
    }

    function testWithdrawReceiverZeroAddress() public {
        vm.prank(owner);
        vm.expectRevert("TokenPayment: receiver is zero address");
        token_payment.withdrawTokens(5, address(0));
    }

    function testWithdrawInvalidAmount() public {
        // supply contract with tokens
        vm.startPrank(address(8));
        token.approve(token_payment_address, 10);
        token_payment.depositTokens(10);
        vm.stopPrank();

        vm.prank(owner);
        vm.expectRevert("TokenPayment: Not enough balance to withdraw");
        token_payment.withdrawTokens(12, address(1));
    }

    function testWithdrawUnapprovedAmount() public {
        // supply contract with tokens
        vm.startPrank(address(8));
        token.approve(token_payment_address, 10);
        token_payment.depositTokens(10);
        vm.stopPrank();

        vm.prank(owner);
        vm.expectRevert("ERC20: insufficient allowance");
        token_payment.withdrawTokens(10, address(1));
    }

    function testSuccessfulWithdrawAllTokens() public {
        // supply contract with tokens
        vm.startPrank(address(8));
        token.approve(token_payment_address, 21);
        token_payment.depositTokens(21);
        vm.stopPrank();

        vm.startPrank(owner);
        token_payment.approveToken(21);
        token_payment.withdrawAllTokens();
        assertEq(token_payment.getTokenBalance(), 0);
        assertEq(token.balanceOf(address(owner)), 21);
        vm.stopPrank();
    }

    function testNotOwnerWithdrawAllTokens() public {
        vm.prank(address(1));
        vm.expectRevert("Ownable: caller is not the owner");
        token_payment.withdrawAllTokens();
    }

    function testWithdrawAllNoBalanceTokens() public {
        vm.prank(owner);
        vm.expectRevert("TokenPayment: No balance to withdraw");
        token_payment.withdrawAllTokens();
    }

    function testWithdrawAllTokensUnapprovedAmount() public {
        // supply contract with tokens
        vm.startPrank(address(8));
        token.approve(token_payment_address, 30);
        token_payment.depositTokens(30);
        vm.stopPrank();

        vm.prank(owner);
        vm.expectRevert("ERC20: insufficient allowance");
        token_payment.withdrawAllTokens();
    }

    function testGetTokenBalance() public {
        // supply contract with tokens
        vm.startPrank(address(8));
        token.approve(token_payment_address, 37);
        token_payment.depositTokens(37);
        vm.stopPrank();

        assertEq(token_payment.getTokenBalance(), 37);
    }
}
