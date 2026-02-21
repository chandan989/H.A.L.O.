import { Wallet } from 'lucide-react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';

export function WalletButton() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();

  // Helper to format address (0x123...abc)
  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <button
      onClick={() => open()}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-mono uppercase tracking-wider border transition-all ${isConnected
          ? 'border-success/50 text-success bg-success/5 hover:bg-success/10'
          : 'border-border text-foreground hover:border-primary hover:text-primary'
        }`}
    >
      <Wallet className="h-3.5 w-3.5" />
      {isConnected && address ? formatAddress(address) : 'Connect Wallet'}
    </button>
  );
}
