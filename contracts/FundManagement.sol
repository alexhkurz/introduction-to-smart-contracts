// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "openzeppelin-contracts-upgradeable/contracts/access/OwnableUpgradeable.sol";
import "openzeppelin-contracts-upgradeable/contracts/security/PausableUpgradeable.sol";
import "openzeppelin-contracts-upgradeable/contracts/proxy/utils/Initializable.sol";

contract FundManagement is
    Initializable,
    OwnableUpgradeable,
    PausableUpgradeable
{
    mapping(address => uint256) public allocations;
    uint256 public totalFunds;
    mapping(address => bool) public approved;
    mapping(address => uint256) public payouts;

    event FundAdded(address indexed _sender, uint256 _value);
    event FundAllocated(address indexed _beneficiary, uint256 _allocation);
    event FundApproved(address indexed _beneficiary, bool _status);
    event FundPayout(address indexed _beneficiary, uint256 _payout);

    function initialize() public initializer {
        __Ownable_init();
        __Pausable_init();
    }

    function addFunds() public payable {
        require(msg.value > 0);
        totalFunds += msg.value;
        emit FundAdded(msg.sender, msg.value);
    }

    function allocateFunds(address payable _beneficiary, uint256 _allocation)
        public
        onlyOwner
    {
        // require(msg.sender == owner);
        require(_allocation <= totalFunds);
        allocations[_beneficiary] += _allocation;
        totalFunds -= _allocation;
        emit FundAllocated(_beneficiary, _allocation);
    }

    function approveBeneficiary(address _beneficiary, bool _status)
        public
        onlyOwner
    {
        // require(msg.sender == owner);
        approved[_beneficiary] = _status;
        emit FundApproved(_beneficiary, _status);
    }

    function requestPayout(address _beneficiary) public {
        require(approved[_beneficiary]);
        require(payouts[_beneficiary] < allocations[_beneficiary]);
        uint256 payout = allocations[_beneficiary] / 2;
        payouts[_beneficiary] += payout;
        // _beneficiary.transfer(payout);
        emit FundPayout(_beneficiary, payout);
    }
}
