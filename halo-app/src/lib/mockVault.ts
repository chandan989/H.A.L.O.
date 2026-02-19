import { useHaloStore } from '../store/useHaloStore';

// Helper to generate random number in range
const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

export const fetchVaultMetrics = async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const store = useHaloStore.getState();

    // Generate new values with constraints
    const newStakingApy = Math.max(3.00, Math.min(5.00, store.stakingApy + randomInRange(-0.15, 0.15)));
    const newFundingRate = Math.max(-5.00, store.fundingRate + randomInRange(-0.40, 0.40));
    const newTvl = store.tvl + randomInRange(-15000, 15000);
    const newCollateralRatio = Math.max(140, Math.min(260, store.collateralRatio + randomInRange(-2, 2)));
    const newOracleBasis = Math.max(0, store.oracleBasis + randomInRange(-0.03, 0.03));
    const newPegRatio = Math.max(0.98, Math.min(1.0005, store.pegRatio + randomInRange(-0.0001, 0.0001)));

    const killSwitch = newFundingRate < 0;
    // If funding rate is negative for 3 consecutive days we trigger kill switch. 
    // For mock, just trigger if negative.

    return {
        stakingApy: Number(newStakingApy.toFixed(2)),
        fundingRate: Number(newFundingRate.toFixed(2)),
        netApy: Number((newStakingApy + newFundingRate).toFixed(2)),
        tvl: Math.floor(newTvl),
        collateralRatio: Math.floor(newCollateralRatio),
        oracleBasis: Number(newOracleBasis.toFixed(3)),
        pegRatio: Number(newPegRatio.toFixed(4)),
        killSwitchActive: killSwitch
    };
};

export const generateYieldHistory = (points = 24) => {
    const data = [];
    let currentYield = 0;

    for (let i = 0; i <= points; i++) {
        // Generate labels like "00:00", "04:00" etc if points map to 24h
        // But spec says "24 data points". Let's assume hourly.
        const hour = i % 24;
        const hourLabel = hour < 10 ? `0${hour}:00` : `${hour}:00`;

        // Accumulate some yield (monotonic increase + noise)
        currentYield += randomInRange(2, 8);
        // Add some jitter to make it look realistic, but yield generally goes up
        const value = Math.max(0, currentYield + randomInRange(-2, 2));

        data.push({
            hour: hourLabel,
            value: Number(value.toFixed(2))
        });
    }
    return data;
};
