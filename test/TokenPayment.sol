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
        // assertEq(token.allowance(address()))
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
        // token.transfer(token_payment_address, 5);
				token_payment.approveToken(5);
        token_payment.depositToken(5);

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

    // function testSuccessfulWithdraw() public {
    //     // supply contract with ether
    //     vm.deal(address(1), 0.5 ether);
    //     vm.prank(address(1));
    //     token_payment.deposit{value: 0.5 ether}();

    //     vm.prank(owner);
    //     token_payment.withdraw(0.4 ether, address(2));
    //     assertEq(contractAddress.balance, 0.1 ether);
    //     assertEq(address(2).balance, 0.4 ether);
    // }

    // function testNotOwnerWithdraw() public {
    //     vm.prank(address(1));
    //     vm.expectRevert("Ownable: caller is not the owner");
    //     token_payment.withdraw(0.5 ether, address(2));
    // }

    // function testWithdrawReceiverZeroAddress() public {
    //     vm.prank(owner);
    //     vm.expectRevert("TreasuryToken: receiver is zero address");
    //     token_payment.withdraw(0.5 ether, address(0));
    // }

    // function testWithdrawInvalidAmount() public {
    //     vm.prank(owner);
    //     vm.expectRevert("TreasuryToken: Not enough balance to withdraw");
    //     token_payment.withdraw(0.15 ether, address(1));
    // }

    // function testSuccessfulWithdrawAll() public {
    //     // supply contract with ether
    //     vm.deal(address(1), 0.8 ether);
    //     vm.prank(address(1));
    //     token_payment.deposit{value: 0.8 ether}();
    //     assertEq(contractAddress.balance, 0.8 ether);

    //     vm.prank(owner);
    //     token_payment.withdrawAll();
    //     assertEq(contractAddress.balance, 0 ether);
    //     assertEq(owner.balance, 0.8 ether);
    // }

    // function testNotOwnerWithdrawAll() public {
    //     vm.prank(address(1));
    //     vm.expectRevert("Ownable: caller is not the owner");
    //     token_payment.withdrawAll();
    // }

    // function testWithdrawAllNoBalance() public {
    //     vm.prank(owner);
    //     vm.expectRevert("token_payment: No balance to withdraw");
    //     token_payment.withdrawAll();
    // }

    // function testGetBalance() public {
    //     // supply contract with ether
    //     vm.deal(address(1), 0.8 ether);
    //     vm.prank(address(1));
    //     token_payment.deposit{value: 0.8 ether}();

    //     assertEq(token_payment.getBalance(), 0.8 ether);
    // }
}
