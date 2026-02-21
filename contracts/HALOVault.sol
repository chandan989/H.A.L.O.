// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./interfaces/IHALOVault.sol";
import "./interfaces/IAsterDEXRouter.sol";
import "./interfaces/IAsBNB.sol";
import "./libraries/RiskEngine.sol";

// Interfaces for Chainlink
interface AggregatorV3Interface {
    function latestRoundData()
        external
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        );
}

/**
 * @title HALOVault
 * @dev Hedged Asset Liquidity Optimizer implementing a delta-neutral, double-dip yield strategy.
 * Earns from staking BNB (asBNB) and opening a 1x short perp to collect funding rates.
 */
contract HALOVault is ERC20, IHALOVault, Ownable, ReentrancyGuard {
    IAsBNB public immutable asBNB;
    IAsterDEXRouter public immutable asterDEX;
    AggregatorV3Interface public immutable bnbOracle;
    
    bool public safetyMode; // Activated by kill switch or depeg
    uint256 public totalBnbDeposited;

    event Deposited(address indexed user, uint256 bnbAmount, uint256 shares);
    event Withdrawn(address indexed user, uint256 bnbAmount, uint256 shares);
    event SafetyModeActivated(string reason);
    event Rebalanced(uint256 oldRatio, uint256 newRatio);
    event Harvested(uint256 yieldAmount, address keeper);

    constructor(
        address _asBNB,
        address _asterDEX,
        address _bnbOracle
    ) ERC20("HALO Vault Share", "HALO") {
        asBNB = IAsBNB(_asBNB);
        asterDEX = IAsterDEXRouter(_asterDEX);
        bnbOracle = AggregatorV3Interface(_bnbOracle);
    }

    /**
     * @notice Deposit BNB into the vault. It stakes for asBNB and implicitly enters a short perp.
     */
    function deposit(uint256 bnbAmount) external payable override nonReentrant {
        require(msg.value == bnbAmount, "HALOVault: Msg.value mismatch");
        require(!safetyMode, "HALOVault: Active Safety Mode");
        require(bnbAmount > 0, "HALOVault: Zero deposit");

        _runRiskChecks();

        // 1. Stake BNB for asBNB
        uint256 asBnbReceived = 0; // Mock: asBNB.stake{value: bnbAmount}();

        // 2. Add collateral to AsterDEX and open 1x Short Perp
        _openShortPosition(asBnbReceived, bnbAmount);

        // 3. Mint Vault Shares (1:1 with BNB for simplicity in initial mint, or proportion of total pool)
        uint256 sharesToMint = totalBnbDeposited == 0 ? bnbAmount : (bnbAmount * totalSupply()) / totalBnbDeposited;
        totalBnbDeposited += bnbAmount;
        
        _mint(msg.sender, sharesToMint);

        emit Deposited(msg.sender, bnbAmount, sharesToMint);
    }

    /**
     * @notice Withdraw BNB by burning shares.
     */
    function withdraw(uint256 shares) external override nonReentrant {
        require(shares > 0 && balanceOf(msg.sender) >= shares, "HALOVault: Invalid shares");

        uint256 proportion = (shares * 1e18) / totalSupply();
        uint256 bnbToReturn = (totalBnbDeposited * proportion) / 1e18; // approximate share

        _burn(msg.sender, shares);
        totalBnbDeposited -= bnbToReturn;

        // 1. Close partial short position
        _closeShortPosition(proportion);

        // 2. Unstake asBNB backing this proportion
        uint256 asBnbToUnstake = 0; // Mock unstake
        
        // 3. Return BNB
        // Mock transfer logic

        emit Withdrawn(msg.sender, bnbToReturn, shares);
    }

    /**
     * @notice Compounds staking rewards and funding rates.
     */
    function harvest() external override nonReentrant returns (uint256 yield) {
        require(!safetyMode, "HALOVault: Safety mode active");
        
        // In reality: claim staking rewards, claim funding fee, swap to add to core position.
        // Simplified for hackathon proof-of-concept.
        yield = 0; // Mock 
        emit Harvested(yield, msg.sender);
    }

    /**
     * @notice Corrects collateral ratio.
     */
    function rebalance() external override nonReentrant {
        require(!safetyMode, "HALOVault: Safety mode active");
        _runRiskChecks();
        emit Rebalanced(1, 1);
    }

    /**
     * @notice Flash-loan assisted exit if extreme drop occurs.
     */
    function emergencyDeleverage() external override nonReentrant {
        require(safetyMode, "HALOVault: Must be in safety mode");
        // Flash loan logic to repay short margin requirement instantly.
    }

    // --- INTERNAL LOGIC ---

    function _runRiskChecks() internal {
        // Mock responses for Hackathon demonstration
        int256 oracleAnswer = 300 * 1e8; 
        uint256 chainlinkPrice = uint256(oracleAnswer) * 1e10; // Assuming 8 decimals to 18
        uint256 markPrice = 300 * 1e18; // asterDEX.getMarkPrice(address(asBNB))
        
        RiskEngine.validateOracleBasis(chainlinkPrice, markPrice);

        // Depeg Circuit Breaker
        uint256 pegRatio = 10000; // asBNB.getExchangeRate(); 
        RiskEngine.checkDepeg(pegRatio);

        // Negative Funding Kill Switch
        int256 fundingRate = 1000; // asterDEX.getFundingRate(address(asBNB));
        if (RiskEngine.checkKillSwitch(fundingRate)) {
            _triggerSafetyMode("Persistent Negative Funding");
        }
    }

    function _triggerSafetyMode(string memory reason) internal {
        safetyMode = true;
        // Logic to close short immediately and sit in asBNB or Stables.
        emit SafetyModeActivated(reason);
    }

    function _openShortPosition(uint256 collateralAmount, uint256 bnbAmount) internal {
        // AsterDEX interactions pseudo-code
    }

    function _closeShortPosition(uint256 proportion) internal {
        // Pseudo-code to close position
    }

    receive() external payable {}
}
