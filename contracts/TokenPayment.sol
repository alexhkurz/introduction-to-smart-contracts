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

    function approveToken(uint256 _amount) external onlyOwner {
        token.approve(address(this), _amount);
    }

    // Function to deposit tokens into the contract
    function depositTokens(uint256 _amount) external {
        token.transferFrom(msg.sender, address(this), _amount);
    }

    function getTokenBalance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    // Function to withdraw tokens from the contract to specified address
    function withdrawTokens(
        uint256 amount,
        address receiver
    ) external onlyOwner {
        require(
            address(receiver) != address(0),
            "TokenPayment: receiver is zero address"
        );
        require(
            token.balanceOf(address(this)) >= amount,
            "TokenPayment: Not enough balance to withdraw"
        );

        bool transfer = token.transferFrom(address(this), receiver, amount);
        require(transfer, "To payee: Failed to send payment");
    }

    // Function to allow the owner to withdraw the entire balance of tokens
    function withdrawAllTokens() external onlyOwner {
        uint256 balance = getTokenBalance();
        require(balance > 0, "TokenPayment: No balance to withdraw");

        bool transfer = token.transferFrom(address(this), msg.sender, balance);
        require(transfer, "To payee: Failed to send payment");
    }
}
