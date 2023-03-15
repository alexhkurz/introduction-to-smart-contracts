// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "openzeppelin-contracts/contracts/access/Ownable.sol";


/*
  By default, the owner of an Ownable contract is the account that deployed it.
*/
contract Treasury is Ownable {
    // Function to deposit Ether into the contract
    function deposit() external payable {
        require(
            msg.value > 0,
            "Treasury: Deposit amount should be greater than zero"
        );


        // The balance of the contract is automatically updated
    }

    // Function to withdraw Ether from the contract to specified address
    function withdraw(uint256 amount, address receiver) external onlyOwner {
        require(
            address(receiver) != address(0),
            "Treasury: receiver is zero address"
        );
        require(
            address(this).balance >= amount,
            "Treasury: Not enough balance to withdraw"
        );


        (bool send, ) = receiver.call{value: amount}("");
        require(send, "To receiver: Failed to send Ether");
    }

    // Function to allow the owner to withdraw the entire balance
    function withdrawAll() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "Treasury: No balance to withdraw");


        (bool send, ) = msg.sender.call{value: balance}("");
        require(send, "To owner: Failed to send Ether");
    }


    // Function to get the contract balance
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
