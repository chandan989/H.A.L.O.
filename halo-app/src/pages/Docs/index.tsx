import styles from './Docs.module.css';

export default function Docs() {
    return (
        <div className={styles.container}>
            <section className={styles.section}>
                <h2 className={styles.title}>1. Executive Summary</h2>
                <p className={styles.text}>
                    H.A.L.O. is a fully autonomous delta-neutral vault. It executes a "double-dip" strategy by staking BNB
                    while simultaneously hedging the price exposure via a 1x short perpetual. This allows the vault to capture two
                    distinct yield sources—staking rewards and short funding rates—with zero directional market risk.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.title}>2. Mathematical Proof</h2>
                <div className={styles.codeBlock}>
                    {`Δ_net = Δ_spot + Δ_short
      = (+1)   + (−1)
      = 0`}
                </div>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr><th>Event</th><th>Spot Leg</th><th>Short Leg</th><th>Net</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>BNB +50%</td><td>+50% gain</td><td>−50% loss</td><td>0</td></tr>
                            <tr><td>BNB −50%</td><td>−50% loss</td><td>+50% gain</td><td>0</td></tr>
                            <tr><td>BNB flat</td><td>Staking APY</td><td>Funding Rate</td><td>Double yield</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.title}>3. Architecture</h2>
                <p className={styles.text}>
                    The vault automates the interaction between liquid staking protocols and decentralized perpetual exchanges.
                </p>
                <div className={styles.codeBlock}>
                    {`User Deposits BNB
       │
       ├─► Stake ──► asBNB ──────────────────► Staking Rewards (~3–5% APY)
       │               │
       │               └──► Collateral on AsterDEX Pro
       │                              │
       └─► Open 1x BNB Short Perp ──►│──► Funding Rates (10–50% APY)
                    └──► Δ = 0 (price movement cancels out)`}
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.title}>4. Smart Contract Interface</h2>
                <div className={styles.codeBlock}>
                    {`interface IHALOVault {
  function deposit() external payable returns (uint256 shares);
  function withdraw(uint256 shares) external returns (uint256 assets);
  function rebalance() external;
  function panic() external; // Emergency exit
}`}
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.title}>5. Rebalancing Logic</h2>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead><tr><th>Condition</th><th>Action</th></tr></thead>
                        <tbody>
                            <tr><td>CR &lt; 150%</td><td>Claim rewards → Swap to USDT → Add margin</td></tr>
                            <tr><td>CR &gt; 250%</td><td>Withdraw excess → Buy asBNB → Compound</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.title}>6. Risk Mitigation</h2>
                <p className={styles.text}>See Protocol Spec for full risk matrix.</p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.title}>7. Security Design</h2>
                <div className={styles.codeBlock}>
                    {`[x] Oracle validation (Chainlink + DEX TWAP)
[x] Max slippage checks (1%)
[x] Circuit breakers
[x] Emergency withdrawal pattern`}
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.title}>8. Tech Stack</h2>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <tbody>
                            <tr><td>Smart Contracts</td><td>Solidity 0.8.20</td></tr>
                            <tr><td>Automation</td><td>Chainlink Keepers</td></tr>
                            <tr><td>Oracles</td><td>Chainlink Price Feeds</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.title}>9. Repository Structure</h2>
                <div className={styles.codeBlock}>
                    {`src/
├── contracts/
├── scripts/
├── test/
└── frontend/`}
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.title}>10. Getting Started</h2>
                <div className={styles.codeBlock}>
                    {`git clone https://github.com/elykid/halo.git
npm install
npx hardhat test
npx hardhat run scripts/deploy.ts`}
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.title} style={{ color: 'var(--danger)' }}>11. Risk Disclosures</h2>
                <ul className={styles.list}>
                    <li>Unaudited software. Use at your own risk.</li>
                    <li>Funding Rate Risk: Negative funding rates can erode yield.</li>
                    <li>De-peg Risk: If asBNB de-pegs significantly, liquidation may occur.</li>
                    <li>Liquidity Risk: Exit liquidity is not guaranteed during black swan events.</li>
                </ul>
            </section>
        </div>
    );
}
