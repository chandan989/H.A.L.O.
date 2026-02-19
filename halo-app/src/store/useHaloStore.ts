import { create } from 'zustand';

interface HaloStore {
    walletAddress: string | null;
    connectWallet: () => void;
    disconnectWallet: () => void;

    stakingApy: number;
    fundingRate: number;
    netApy: number;
    tvl: number;
    userDeposit: number;
    yieldEarned: number;
    collateralRatio: number;
    killSwitchActive: boolean;
    oracleBasis: number;
    pegRatio: number;

    deposit: (bnbAmount: number) => void;
    withdraw: (shares: number) => void;
    updateMetrics: (m: Partial<HaloStore>) => void;
}

export const useHaloStore = create<HaloStore>((set) => ({
    walletAddress: null,
    connectWallet: () => set({ walletAddress: "0xAbCd...Ef12" }),
    disconnectWallet: () => set({ walletAddress: null }),

    stakingApy: 4.20,
    fundingRate: 12.80,
    netApy: 17.00,
    tvl: 4820000,
    userDeposit: 2.500,
    yieldEarned: 142.88,
    collateralRatio: 187,
    killSwitchActive: false,
    oracleBasis: 0.08,
    pegRatio: 0.9997,

    deposit: (bnbAmount) => set((state) => ({
        userDeposit: state.userDeposit + bnbAmount,
        tvl: state.tvl + (bnbAmount * 312.40)
    })),
    withdraw: (shares) => set((state) => ({
        userDeposit: Math.max(0, state.userDeposit - shares)
    })),
    updateMetrics: (m) => set(m),
}));
