// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "openzeppelin-contracts/contracts/access/Ownable.sol";
import "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

/*
  By default, the owner of an Ownable contract is the account that deployed it.
*/
contract TokenPayment is Ownable {
    IERC20 token;

    constructor(address _token) {
        token = IERC20(_token);
    }

    function approveToken(uint256 _amount) external {
        token.approve(address(this), _amount);
    }

    function depositToken(uint256 _amount) external {
        token.transfer(address(this), _amount);
    }

    function getTokenBalance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    // Function to deposit tokens into the contract
    // function depositTokens() external payable {
    //     require(
    //         msg.value > 0,
    //         "TreasuryToken: Deposit amount should be greater than zero"
    //     );

    //     // The balance of the contract is automatically updated
    // }

    // Function to withdraw tokens from the contract to specified address
    function withdrawTokens(
        uint256 amount,
        address receiver
    ) external onlyOwner {
        require(
            address(receiver) != address(0),
            "TreasuryToken: receiver is zero address"
        );
        require(
            token.balanceOf(address(this)) >= amount,
            "TreasuryToken: Not enough tokens to withdraw"
        );

        bool transfer = token.transferFrom(address(this), receiver, amount);
        require(transfer, "To payee: Failed to send payment");
    }

    // Function to allow the owner to withdraw the entire balance of tokens
    function withdrawAllTokens() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "TreasuryToken: No balance to withdraw");

        bool transfer = token.transferFrom(address(this), msg.sender, balance);
        require(transfer, "To payee: Failed to send payment");
    }
}
