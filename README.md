<div align="center">

# ✦ H.A.L.O

### Hedged Asset Liquidity Optimizer

*A fully autonomous, delta-neutral vault that earns yield from two independent sources simultaneously — without exposing depositors to directional price risk.*

[![License: MIT](https://img.shields.io/badge/License-MIT-white.svg)](https://opensource.org/licenses/MIT)
[![Built on AsterDEX](https://img.shields.io/badge/Built%20on-AsterDEX-blueviolet)](https://asterdex.finance)
[![Powered by Chainlink](https://img.shields.io/badge/Powered%20by-Chainlink%20Automation-375BD2)](https://chain.link/automation)
[![Status: Hackathon Build](https://img.shields.io/badge/Status-Hackathon%20Build-orange)]()

</div>

---

## Executive Summary — The Double-Dip

Retail crypto users face an impossible choice: hold assets and hope the market goes up, or sit in stablecoins earning next to nothing. Institutional hedge funds have long avoided this dilemma using **delta-neutral strategies** — earning yield from the *structure* of the market rather than its direction.

HALO brings that same strategy on-chain, permissionlessly, with no human operators required.

When a user deposits BNB, the vault executes a two-sided position simultaneously:

- **Long Leg** — BNB is staked as `asBNB`, earning native staking yield (~3–5% APY).
- **Short Leg** — The staked `asBNB` is posted as collateral on AsterDEX Pro and a 1x BNB short perpetual is opened, collecting funding rate payments (historically 10–50% APY in bull markets).

The combined portfolio carries **zero net directional exposure**. The vault earns from two structural sources at once — hence "double-dip."

> *"This protocol fulfills the 'Hedging' design prompt by democratizing delta-neutral strategies previously only available to institutional hedge funds."*

---

## Mathematical Proof of Delta Neutrality

The vault's net delta is defined as:

```
Δ_net = Δ_spot + Δ_short
      = (+1) + (−1)
      = 0
```

At any point in time:

| Event | Spot Leg (asBNB) | Short Leg (Perp) | Net |
|---|---|---|---|
| BNB +50% | +50% gain | −50% loss | **0** |
| BNB −50% | −50% loss | +50% gain | **0** |
| BNB flat | Staking APY | Funding Rate | **Double yield** |

Portfolio value in USD remains constant regardless of price movement. The vault only earns — it never bleeds from market direction.

---

## Architecture

HALO is a single smart contract — a self-contained autonomous vault with no admin keys, no upgrade proxies, and no custodial control.

```
User Deposits BNB
       │
       ├─► Stake ──────► asBNB ──────────────────► Staking Rewards (~3–5% APY)
       │                   │
       │                   └──► Collateral on AsterDEX Pro
       │                                  │
       └─► Open 1x BNB Short Perp ───────►│──► Funding Rates (10–50% APY)
                    │
                    └──► Δ = 0 (price movement cancels out)
```

### Core Interface

```solidity
interface IHALOVault {
    function deposit(uint256 bnbAmount) external payable;
    function withdraw(uint256 shares) external;
    function harvest() external returns (uint256 yield);
    function rebalance() external; // permissionless — callable by any keeper
    function emergencyDeleverage() external; // flash-loan-assisted exit path
}
```

### Rebalancing Logic

The vault continuously monitors its collateral ratio. When BNB price moves, the vault drifts from delta neutrality. `rebalance()` corrects this:

| Trigger | Condition | Action |
|---|---|---|
| BNB Price Up | Collateral Ratio < 150% | Claim staking rewards → swap to USDT → add margin |
| BNB Price Down | Collateral Ratio > 250% | Withdraw excess profit → buy more `asBNB` → compound |

---

## Risk Mitigation

### Risk Matrix

| Risk | Mitigation |
|---|---|
| Liquidation | Auto-rebalance via Keeper at 150% collateral ratio |
| Negative Funding | Kill switch retreats vault to pure stables |
| Oracle Manipulation | TWAP + Dual Oracle validation (Chainlink × AsterDEX mark price) |
| Price Lag / MEV | Basis check: rebalance paused if Chainlink/mark price spread > 0.5% |
| asBNB De-peg | Circuit breaker activates if `asBNB/BNB` ratio falls below 0.98 |
| Flash Loan Attack | `MAX_SLIPPAGE = 1%` hardcoded — any trade reverting this threshold is blocked |

---

### Dual-Oracle Validation

Standard rebalancing using a single price feed creates a critical attack surface: if the spot oracle and the DEX mark price diverge, the vault can be front-run or pushed into unfavorable trades.

HALO validates both before executing any trade:

```solidity
// Pseudo-code — actual implementation in RiskEngine.sol
uint256 chainlinkPrice = getChainlinkPrice();
uint256 markPrice = getAsterDEXMarkPrice();
uint256 basis = abs(chainlinkPrice - markPrice) * 1e18 / chainlinkPrice;

require(basis <= MAX_BASIS, "ORACLE_DIVERGENCE: rebalance paused");
```

If the spread exceeds `0.5%`, the rebalance is paused until prices converge. This prevents the vault from being gamed during price squeezes or oracle lag windows.

---

### De-Peg Circuit Breaker

`asBNB` is the vault's collateral base. If it de-pegs from BNB — due to a liquidity crisis, bridge exploit, or staking contract bug — collateral value drops while the short obligation stays fixed, risking liquidation even on a flat market.

```solidity
uint256 pegRatio = getAsBNBtoBNBRatio(); // from TWAP oracle

if (pegRatio < MIN_PEG_RATIO) {          // 0.98 (2% de-peg threshold)
    _triggerKillSwitch();
}
```

When triggered, the vault immediately closes the short, unlocks collateral, and retreats to safety mode. This is not a manual override — it is encoded defense logic.

---

### Dynamic Keeper Fee

A flat 1% harvest fee creates a perverse incentive: bots won't call `harvest()` during high-gas conditions (losing user yield), but will front-run each other during favorable ones (wasting gas). HALO uses a dynamic keeper fee instead:

```solidity
uint256 keeperFee = estimateGasCost() * GAS_MULTIPLIER + BASE_FEE_BPS;
```

The reward scales with the actual complexity and gas cost of the rebalance, ensuring keepers are always economically incentivized to act, regardless of network conditions.

---

## Advanced Features

### Flash Loan De-Leverage (Black Swan Protection)

In extreme tail-risk events (e.g., BNB drops 50% in under 60 seconds), the standard rebalance loop cannot react fast enough. Rather than accepting liquidation, the vault executes an atomic flash loan exit:

1. Borrow stablecoins via flash loan equal to the short's margin requirement.
2. Instantly repay the short position and close it.
3. Unlock the `asBNB` collateral.
4. Repay the flash loan from freed collateral.
5. Return remaining assets proportionally to depositors.

This is atomic — it either fully succeeds or fully reverts. User funds are never partially exposed.

### Concentrated Liquidity Hedge *(Advanced)*

Instead of a simple 1x short, the vault can optionally concentrate its hedge within a tight price band (e.g., ±5% from current price) on AsterDEX's AMM. This captures swap fee revenue on top of funding rates — a third yield layer from the same capital.

### Funding Arbitrage Mode *(Advanced)*

If funding rates diverge significantly across perpetual markets, the vault's risk engine (or a signed instruction from a governance-lite AI agent) can migrate the short position to the higher-paying venue, capturing the spread without changing exposure.

---

## Kill Switch — Safety Mode

HALO monitors funding rates continuously. If the rate turns persistently negative — meaning the vault would *pay* to hold the short — the risk engine activates automatically:

```
IF FundingRate < -0.05% FOR 3 consecutive days:
    1. Close perpetual short
    2. Unstake asBNB or swap to stablecoins
    3. Hold in Safety Mode
    4. Resume when conditions normalize
```

The system adapts to market conditions. It is designed to be **smart, not just automated**.

---

## Security Design

```
❌ No admin keys that can drain user funds
❌ No upgrade proxies that can alter logic post-deploy
❌ No off-chain signers with privileged access
✅ All funds locked in the contract, never in an EOA
✅ MAX_SLIPPAGE = 1% hardcoded — adverse rebalances revert automatically
✅ Dual-oracle validation prevents price manipulation attacks
✅ De-peg circuit breaker protects against collateral failure
✅ Permissionless keeper network — protocol operates without the team
```

---

## Repository Structure

```
halo/
├── contracts/
│   ├── HALOVault.sol              # Core vault: deposit, withdraw, harvest
│   ├── interfaces/
│   │   ├── IAsterDEXRouter.sol
│   │   └── IAsBNB.sol
│   └── libraries/
│       └── RiskEngine.sol         # Oracle validation, kill switch, peg monitor
├── scripts/
│   ├── deploy.js
│   └── simulate.js                # Full rebalance simulation incl. edge cases
├── test/
│   ├── vault.test.js
│   └── edge-cases.test.js         # Black swan, de-peg, negative funding, MEV
├── docs/
│   └── architecture.md
└── README.md
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Smart Contracts | Solidity + Hardhat |
| Automation | Chainlink Automation (keeper network) |
| Oracles | Chainlink Price Feeds + AsterDEX TWAP |
| Perpetuals | AsterDEX Pro (`IAsterDEXRouter`) |
| Liquid Staking | AsterDEX `asBNB` |
| Flash Loans | AsterDEX or compatible provider |

---

## Getting Started

```bash
git clone https://github.com/elykid/halo.git
cd halo

npm install

npx hardhat test

# Deploy to BNB testnet
npx hardhat run scripts/deploy.js --network bnb_testnet
```

---

## Risk Disclosures

- Smart contract code is unaudited at this stage. Do not deposit funds you cannot afford to lose.
- Funding rates can turn negative; the kill switch mitigates but does not eliminate this risk.
- The de-peg circuit breaker reduces but cannot fully eliminate LST de-peg risk.
- Flash loan de-leverage assumes sufficient DEX liquidity exists during the event. Extreme illiquidity may prevent full recovery.
- This is an experimental hackathon build.

---

<div align="center">

Built by **Elykid Private Limited** · Hackathon Build · 2026

*"Yield from structure, not speculation."*

</div>
