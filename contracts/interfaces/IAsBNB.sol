// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IAsBNB is IERC20 {
    function stake() external payable returns (uint256);
    function unstake(uint256 amount) external;
    function getExchangeRate() external view returns (uint256);
}
