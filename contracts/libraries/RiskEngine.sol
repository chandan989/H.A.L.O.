// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library RiskEngine {
    uint256 public constant MAX_BASIS = 50; // 0.5% (10000 = 100%)
    uint256 public constant MIN_PEG_RATIO = 9800; // 0.98 (10000 = 1.0)
    int256 public constant MIN_FUNDING_RATE = -50000; // -0.05% represented in AsterDEX scale

    error ORACLE_DIVERGENCE();
    error PEG_LOST();
    error NEGATIVE_FUNDING_KILLSWITCH();

    function validateOracleBasis(
        uint256 chainlinkPrice,
        uint256 markPrice
    ) internal pure {
        uint256 diff = chainlinkPrice > markPrice 
            ? chainlinkPrice - markPrice 
            : markPrice - chainlinkPrice;
            
        uint256 basis = (diff * 10000) / chainlinkPrice;

        if (basis > MAX_BASIS) {
            revert ORACLE_DIVERGENCE();
        }
    }

    function checkDepeg(uint256 pegRatio) internal pure {
        if (pegRatio < MIN_PEG_RATIO) {
            revert PEG_LOST();
        }
    }

    function checkKillSwitch(int256 fundingRate) internal pure returns (bool) {
        if (fundingRate < MIN_FUNDING_RATE) {
            return true; // Trigger kill switch
        }
        return false;
    }
}
