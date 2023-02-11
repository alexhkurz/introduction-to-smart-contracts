//by Christopher Chang, Alexander Kurz
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract PayAndGuess0 {
    address payable public payer; 
    uint public paid;

    function doPay() public payable {
        payer = payable(msg.sender);
        paid = msg.value;
    }

    function disburse() public {
        require(paid > 0, "Nothing to disburse.");
        address payable payee = payer;

        // transfer the money to the player
        payee.transfer(paid);

        // reset info on player to default
        delete payer;
        delete paid;
    }
}
