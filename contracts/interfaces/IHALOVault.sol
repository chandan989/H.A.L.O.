// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IHALOVault {
    function deposit(uint256 bnbAmount) external payable;
    function withdraw(uint256 shares) external;
    function harvest() external returns (uint256 yield);
    function rebalance() external; // permissionless — callable by any keeper
    function emergencyDeleverage() external; // flash-loan-assisted exit path
}
