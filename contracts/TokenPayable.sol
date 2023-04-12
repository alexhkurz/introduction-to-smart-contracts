// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "openzeppelin-contracts/contracts/access/Ownable.sol";
import "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

/*
  By default, the owner of an Ownable contract is the account that deployed it.
*/
contract TokenPayable is Ownable {
    IERC20 token;

    constructor(address _token) {
        token = IERC20(_token);
    }

    function _approveToken(uint256 _amount) public onlyOwner {
        token.approve(address(this), _amount);
    }

    // Function to deposit tokens into the contract
    function _depositToken(uint256 _amount) public {
        token.transferFrom(msg.sender, address(this), _amount);
    }

    function _getTokenBalance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    // Function to withdraw tokens from the contract to specified address
    function _withdrawToken(
        uint256 amount,
        address receiver
    ) public onlyOwner {
        require(
            address(receiver) != address(0),
            "TokenPayable: receiver is zero address"
        );
        require(
            token.balanceOf(address(this)) >= amount,
            "TokenPayable: Not enough balance to withdraw"
        );

        bool transfer = token.transferFrom(address(this), receiver, amount);
        require(transfer, "To payee: Failed to send payment");
    }

    // Function to allow the owner to withdraw the entire balance of tokens
    function _withdrawAllToken() public onlyOwner {
        uint256 balance = _getTokenBalance();
        require(balance > 0, "TokenPayable: No balance to withdraw");

        bool transfer = token.transferFrom(address(this), msg.sender, balance);
        require(transfer, "To payee: Failed to send payment");
    }
}
