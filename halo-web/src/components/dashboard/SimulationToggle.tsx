import { useVaultStore } from '@/stores/vaultStore';
import { FlaskConical } from 'lucide-react';

export function SimulationToggle() {
  const {
    simulationMode,
    simulatedPriceDrop,
    simulatedNegativeFunding,
    simulatedDepeg,
    setSimulationMode,
    setSimulatedPriceDrop,
    setSimulatedNegativeFunding,
    setSimulatedDepeg
  } = useVaultStore();

  return (
    <div className={`relative overflow-hidden rounded-md border transition-colors duration-500 p-6 flex flex-col justify-between ${simulationMode ? 'bg-warning/10 border-warning/50' : 'bg-background/40 border-border backdrop-blur-sm'}`}>

      {/* Header / Toggle */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <FlaskConical className={`h-5 w-5 ${simulationMode ? 'text-warning animate-pulse' : 'text-muted-foreground'}`} />
          <div>
            <h3 className={`text-sm font-bold uppercase tracking-widest ${simulationMode ? 'text-warning' : 'text-muted-foreground'}`}>Stress Test</h3>
            <p className="text-[10px] text-muted-foreground mt-1">Simulate market crashes</p>
          </div>
        </div>

        <button
          onClick={() => setSimulationMode(!simulationMode)}
          className={`relative h-6 w-12 rounded-full transition-colors ${simulationMode ? 'bg-warning' : 'bg-secondary'}`}
        >
          <span className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform ${simulationMode ? 'translate-x-6' : ''}`} />
        </button>
      </div>

      {/* Simulation Controls (Only visible when active, or faded when inactive) */}
      <div className={`space-y-6 pt-6 transition-opacity duration-300 ${simulationMode ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
        {/* BNB Price Drop */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">BNB Price Drop</span>
            <span className="font-mono text-2xl font-bold text-destructive">-{simulatedPriceDrop}%</span>
          </div>

          <div className="relative h-6 flex items-center">
            <input
              type="range"
              min="0"
              max="80"
              value={simulatedPriceDrop}
              onChange={(e) => setSimulatedPriceDrop(parseInt(e.target.value))}
              className="w-full accent-destructive h-1.5 bg-background/50 rounded-full appearance-none cursor-pointer z-10 relative"
            />
            {/* Track marks */}
            <div className="absolute inset-0 flex justify-between pointer-events-none px-1">
              {[0, 20, 40, 60, 80].map(v => (
                <div key={v} className="w-0.5 h-1 bg-muted-foreground/30" />
              ))}
            </div>
          </div>
          <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
            <span>-0%</span>
            <span>-80%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 pt-4 border-t border-border/50">
          {/* De-Peg Simulation */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">asBNB De-Peg</span>
              <span className="font-mono text-sm font-bold text-destructive">-{simulatedDepeg}%</span>
            </div>

            <div className="relative h-6 flex items-center">
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={simulatedDepeg}
                onChange={(e) => setSimulatedDepeg(parseFloat(e.target.value))}
                className="w-full accent-destructive h-1.5 bg-background/50 rounded-full appearance-none cursor-pointer z-10 relative"
              />
            </div>
          </div>

          {/* Negative Funding Toggle */}
          <div className="space-y-4">
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Force Negative Funding</span>
            </div>

            <button
              onClick={() => setSimulatedNegativeFunding(!simulatedNegativeFunding)}
              className={`relative h-6 w-12 rounded-full transition-colors ${simulatedNegativeFunding ? 'bg-destructive' : 'bg-secondary'}`}
            >
              <span className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform ${simulatedNegativeFunding ? 'translate-x-6' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
