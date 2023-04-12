// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

/*
 * This is a mock ERC20 contract for testing purposes
 */
contract Token is ERC20 {
    constructor() ERC20("MyToken", "MTK") {
        _mint(msg.sender, 50);
    }
}
