// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;

import 'ds-test/test.sol';
import 'forge-std/Test.sol';
import 'forge-std/Vm.sol';
import '../contracts/Token.sol';

contract ERC1155TokenTest is DSTest {
  using stdStorage for StdStorage;

  Vm private vm = Vm(HEVM_ADDRESS);
  Token private token;
  StdStorage private stdstore;
  address public owner;

  function setUp() public {
    token = new Token();
    token.initialize();
    owner = address(this);
  }

  function testInitializeTwice() public {
    vm.expectRevert('Initializable: contract is already initialized');
    token.initialize();
  }

  function testInitializeOwner() public {
    assertEq(token.owner(), owner);
  }

  function testNotOwnerPauseUnpause() public {
    vm.startPrank(address(1));

    vm.expectRevert('Ownable: caller is not the owner');
    token.pause();

    vm.expectRevert('Ownable: caller is not the owner');
    token.unpause();

    vm.stopPrank();
  }

  function testPauseUnpause() public {
    token.pause();
    vm.expectRevert('Pausable: paused');
    token.mint(address(1), 1, 1, '');

    token.unpause();
    token.mint(address(1), 1, 1, '');
    assertEq(token.balanceOf(address(1), 1), 1);
  }

  function testNotOwnerCallMint() public {
    vm.expectRevert('Ownable: caller is not the owner');
    vm.startPrank(address(1));
    token.mint(address(2), 1, 1, '');
    vm.stopPrank();
  }

  function testNotOwnerCallMintBatch() public {
    vm.expectRevert('Ownable: caller is not the owner');
    vm.startPrank(address(1));

    uint256[] memory ids = new uint256[](2);
    ids[0] = 1;
    ids[1] = 2;
    uint256[] memory amounts = new uint256[](2);
    amounts[0] = 1;
    amounts[1] = 1;
    token.mintBatch(address(2), ids, amounts, '');

    vm.stopPrank();
  }

  function testFailMintToZeroAddress() public {
    token.mint(address(0), 1, 1, '');
  }

  function testCallMint() public {
    token.mint(address(1), 1, 1, '');
    assertEq(token.balanceOf(address(1), 1), 1);
  }

  function testCallMintBatch() public {
    uint256[] memory ids = new uint256[](2);
    ids[0] = 1;
    ids[1] = 2;
    uint256[] memory amounts = new uint256[](2);
    amounts[0] = 1;
    amounts[1] = 2;

    token.mintBatch(address(1), ids, amounts, '');
    assertEq(token.balanceOf(address(1), 1), 1);
    assertEq(token.balanceOf(address(1), 2), 2);
  }

  function testNotOwnerSafeTransfer() public {
    token.mint(address(1), 1, 3, '');
    vm.expectRevert('Ownable: caller is not the owner');
    vm.startPrank(address(1));
    token.safeTransferFrom(address(1), address(2), 1, 2, '');
    vm.stopPrank();
  }

  function testTransferFrom() public {
    token.mint(address(1), 1, 3, '');
    token.safeTransferFrom(address(1), address(2), 1, 2, '');

    assertEq(token.balanceOf(address(1), 1), 1);
    assertEq(token.balanceOf(address(2), 1), 2);
  }

  function testSetURI() public {
    token.setURI('test_uri');
    assertEq(token.uri(1), 'test_uri');
    assertEq(token.uri(2), 'test_uri');
  }

  function testBurnBatch() public {
    uint256[] memory ids = new uint256[](2);
    ids[0] = 1;
    ids[1] = 2;
    uint256[] memory amounts = new uint256[](2);
    amounts[0] = 1;
    amounts[1] = 2;

    token.mintBatch(address(1), ids, amounts, '');
    assertEq(token.balanceOf(address(1), 1), 1);
    assertEq(token.balanceOf(address(1), 2), 2);

    vm.prank(address(1));
    token.burnBatch(address(1), ids, amounts);
    assertEq(token.balanceOf(address(1), 1), 0);
    assertEq(token.balanceOf(address(1), 2), 0);
  }
}
