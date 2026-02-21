// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IAsterDEXRouter {
    function openPosition(
        address collateralToken,
        address indexToken,
        uint256 collateralDelta,
        uint256 sizeDelta,
        bool isLong,
        uint256 acceptablePrice
    ) external payable;

    function closePosition(
        address collateralToken,
        address indexToken,
        uint256 collateralDelta,
        uint256 sizeDelta,
        bool isLong,
        uint256 acceptablePrice
    ) external payable;

    function getMarkPrice(address token) external view returns (uint256);
    function getFundingRate(address token) external view returns (int256);
}
