// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Quant {
    address public owner;
    uint256 public subscriptionAmount;

    // Events
    event SubscriptionPurchased(address indexed user, uint256 amount);
    event SubscriptionAmountUpdated(uint256 newAmount);
    event FundsWithdrawn(address indexed owner, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor(uint256 _subscriptionAmount) {
        owner = msg.sender;
        subscriptionAmount = _subscriptionAmount;
    }

    function buy_subscription() external payable {
        require(msg.value >= subscriptionAmount, "Insufficient funds sent for subscription");

        // Emitting event to log the subscription purchase
        emit SubscriptionPurchased(msg.sender, msg.value);
    }

    function updateSubscriptionAmount(uint256 _newAmount) external onlyOwner {
        subscriptionAmount = _newAmount;
        emit SubscriptionAmountUpdated(_newAmount);
    }

    function withdrawFunds() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds available for withdrawal");

        (bool success, ) = owner.call{value: balance}("");
        require(success, "Transfer failed");

        emit FundsWithdrawn(owner, balance);
    }

    // Fallback function to handle any direct payments to the contract
    receive() external payable {}
}
