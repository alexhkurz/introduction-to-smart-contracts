// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import 'openzeppelin-contracts-upgradeable/contracts/token/ERC1155/ERC1155Upgradeable.sol';
import 'openzeppelin-contracts-upgradeable/contracts/access/OwnableUpgradeable.sol';
import 'openzeppelin-contracts-upgradeable/contracts/security/PausableUpgradeable.sol';
import 'openzeppelin-contracts-upgradeable/contracts/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol';
import 'openzeppelin-contracts-upgradeable/contracts/proxy/utils/Initializable.sol';

contract Token is
  Initializable,
  ERC1155Upgradeable,
  OwnableUpgradeable,
  PausableUpgradeable,
  ERC1155BurnableUpgradeable
{
  string public name;
  string public symbol;
  uint256 public totalSupply;

  function initialize() public initializer {
    __ERC1155_init('');
    __Ownable_init();
    __Pausable_init();
    __ERC1155Burnable_init();

    name = 'Test_Contract';
    symbol = 'TST';
    totalSupply = 10000 * 10**uint256(0);
  }

  function setURI(string memory newuri) public onlyOwner {
    _setURI(newuri);
  }

  function pause() public onlyOwner {
    _pause();
  }

  function unpause() public onlyOwner {
    _unpause();
  }

  function mint(
    address account,
    uint256 id,
    uint256 amount,
    bytes memory data
  ) public onlyOwner {
    _mint(account, id, amount, data);
  }

  function mintBatch(
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data
  ) public onlyOwner {
    _mintBatch(to, ids, amounts, data);
  }

  function safeTransferFrom(
    address from,
    address to,
    uint256 id,
    uint256 amount,
    bytes memory data
  ) public override onlyOwner {
    _safeTransferFrom(from, to, id, amount, data);
  }

  function safeBatchTransferFrom(
    address from,
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data
  ) public override onlyOwner {
    _safeBatchTransferFrom(from, to, ids, amounts, data);
  }

  function _beforeTokenTransfer(
    address operator,
    address from,
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data
  ) internal override whenNotPaused {
    super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
  }
}
