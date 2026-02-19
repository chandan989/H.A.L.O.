import { useVaultStore } from '@/stores/vaultStore';
import { StatBox } from '@/components/halo/StatBox';

export function OverviewPanel() {
  const { userNetWorth, userDeposit, userPnl, currentApy, stakingApy, fundingApy } = useVaultStore();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
      <StatBox
        label="Net Worth"
        value={`${userNetWorth.toFixed(3)} BNB`}
        subValue={`≈ $${(userNetWorth * 620).toFixed(2)}`}
      />
      <StatBox
        label="Total PNL"
        value={`+${userPnl.toFixed(3)} BNB`}
        subValue={`+${((userPnl / userDeposit) * 100).toFixed(2)}%`}
        variant="success"
      />
      <StatBox
        label="Combined APY"
        value={`${currentApy}%`}
        subValue={`${stakingApy}% stk + ${fundingApy}% fnd`}
        variant="success"
      />
      <StatBox
        label="Deposited"
        value={`${userDeposit.toFixed(3)} BNB`}
        subValue="Active position"
      />
    </div>
  );
}
