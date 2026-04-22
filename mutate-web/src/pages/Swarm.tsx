import { VaultCard } from "@/components/VaultCard";
import { LinearPacer } from "@/components/LinearPacer";
import { ForceGraph } from "@/visualizations/ForceGraph";
import { CandlestickChart } from "@/visualizations/CandlestickChart";
import { OrderBookDepth } from "@/visualizations/OrderBookDepth";
import { ShieldCheck, Cpu, KeyRound } from "lucide-react";

const dimensions = [
  { name: "Loss Aversion", value: 0.62, range: "0.5 — 3.0" },
  { name: "Herding Coefficient", value: 0.41, range: "0.0 — 1.0" },
  { name: "Risk Appetite", value: 0.78, range: "Conservative → Degen" },
  { name: "Narrative Sensitivity", value: 0.55, range: "Low → High" },
  { name: "Time Horizon", value: 0.32, range: "Seconds → Weeks" },
  { name: "Information Processing", value: 0.69, range: "Noise → Signal" },
];

const Swarm = () => (
  <section className="mx-auto max-w-[1440px] px-6 pt-10 pb-12">
    <p className="mono mb-3">/ SWARM // SYNTHETIC MARKET POPULATION</p>
    <h2 className="display text-[clamp(2rem,5vw,4rem)] mb-8">15,247 AUTONOMOUS AGENTS</h2>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7">
        <VaultCard label="FORCE GRAPH // AGENT CLUSTERS">
          <ForceGraph />
        </VaultCard>
      </div>
      <div className="lg:col-span-5 space-y-6">
        <VaultCard label="AGENT TAXONOMY // BEHAVIORAL DIMENSIONS">
          <div className="space-y-5">
            {dimensions.map((d) => (
              <div key={d.name}>
                <LinearPacer value={d.value} label={d.name} weight={d.range} />
              </div>
            ))}
          </div>
        </VaultCard>
        
        {/* Pieverse TEE Integration Panel */}
        <VaultCard label="PIEVERSE PURRFECT CLAW // TEE ENCLAVES" accentColor="success-gold">
           <div className="space-y-4 font-mono text-[11px] uppercase tracking-widest text-ink/80">
              <p className="text-success-gold border-b border-success-gold/20 pb-2 mb-4">HARDWARE-ANCHORED WALLET ISOLATION ACTIVE.</p>
              
              <div className="flex items-center justify-between border border-ink/10 bg-canvas/80 p-3">
                 <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-success-gold" />
                    <span>TEE ATTESTATION</span>
                 </div>
                 <span className="text-success-gold font-bold">VERIFIED_SGX</span>
              </div>
              
              <div className="flex items-center justify-between border border-ink/10 bg-canvas/80 p-3">
                 <div className="flex items-center gap-3">
                    <Cpu className="w-4 h-4 text-ink" />
                    <span>PROTOCOL</span>
                 </div>
                 <span className="text-ink font-bold">x402b GASLESS</span>
              </div>
              
              <div className="flex items-center justify-between border border-ink/10 bg-canvas/80 p-3">
                 <div className="flex items-center gap-3">
                    <KeyRound className="w-4 h-4 text-ink" />
                    <span>ERC-8004 IDENTITY</span>
                 </div>
                 <span className="text-ink font-bold">P_CLAW_NFT_BOUND</span>
              </div>
              
              <div className="flex justify-between items-center text-[9px] text-ink/50 pt-2">
                 <span>15,247 KEYPAIRS ISOLATED</span>
                 <span>LATENCY: 4MS</span>
              </div>
           </div>
        </VaultCard>
      </div>

      <div className="lg:col-span-7">
        <VaultCard label="SYNTHETIC EXCHANGE // 1m CANDLES">
          <CandlestickChart />
        </VaultCard>
      </div>
      <div className="lg:col-span-5">
        <VaultCard label="ORDER BOOK DEPTH">
          <OrderBookDepth />
        </VaultCard>
      </div>
    </div>
  </section>
);

export default Swarm;
