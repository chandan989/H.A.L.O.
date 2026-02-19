import { useState } from 'react';
import { Wallet } from 'lucide-react';

export function WalletButton() {
  const [connected, setConnected] = useState(false);
  const mockAddress = '0x1a2B...9f4E';

  return (
    <button
      onClick={() => setConnected(!connected)}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-mono uppercase tracking-wider border transition-all ${
        connected
          ? 'border-success/50 text-success bg-success/5 hover:bg-success/10'
          : 'border-border text-foreground hover:border-primary hover:text-primary'
      }`}
    >
      <Wallet className="h-3.5 w-3.5" />
      {connected ? mockAddress : 'Connect Wallet'}
    </button>
  );
}
