import { create } from 'zustand';

interface VaultState {
  // Protocol stats
  tvl: number;
  currentApy: number;
  stakingApy: number;
  fundingApy: number;
  riskScore: string;
  
  // User position
  userDeposit: number;
  userPnl: number;
  userNetWorth: number;
  
  // Risk metrics
  collateralRatio: number;
  oracleSpread: number;
  pegHealth: number;
  
  // Simulation
  simulationMode: boolean;
  simulatedPriceDrop: number;
  
  // PnL history
  pnlHistory: { date: string; pnl: number; staking: number; funding: number }[];
  
  // Actions
  setSimulationMode: (enabled: boolean) => void;
  setSimulatedPriceDrop: (drop: number) => void;
  deposit: (amount: number) => void;
  withdraw: (amount: number) => void;
}

const generatePnlHistory = () => {
  const data = [];
  let cumPnl = 0;
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const staking = 0.012 + Math.random() * 0.008;
    const funding = 0.008 + Math.random() * 0.015;
    cumPnl += staking + funding;
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      pnl: parseFloat((cumPnl * 100).toFixed(2)),
      staking: parseFloat((staking * 100).toFixed(3)),
      funding: parseFloat((funding * 100).toFixed(3)),
    });
  }
  return data;
};

export const useVaultStore = create<VaultState>((set) => ({
  tvl: 24_850_000,
  currentApy: 18.4,
  stakingApy: 4.2,
  fundingApy: 14.2,
  riskScore: 'LOW',
  
  userDeposit: 12.5,
  userPnl: 0.847,
  userNetWorth: 13.347,
  
  collateralRatio: 215,
  oracleSpread: 0.12,
  pegHealth: 99.87,
  
  simulationMode: false,
  simulatedPriceDrop: 50,
  
  pnlHistory: generatePnlHistory(),
  
  setSimulationMode: (enabled) => set({ simulationMode: enabled }),
  setSimulatedPriceDrop: (drop) => set({ simulatedPriceDrop: drop }),
  
  deposit: (amount) => set((state) => ({
    userDeposit: state.userDeposit + amount,
    userNetWorth: state.userNetWorth + amount,
  })),
  
  withdraw: (amount) => set((state) => ({
    userDeposit: Math.max(0, state.userDeposit - amount),
    userNetWorth: Math.max(0, state.userNetWorth - amount),
  })),
}));
