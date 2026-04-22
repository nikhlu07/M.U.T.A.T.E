import { useState, useEffect } from "react";
import { VaultCard } from "@/components/VaultCard";
import { ScrambleText } from "@/components/ScrambleText";
import { ArrowRight, ExternalLink, Loader2, TrendingUp, Sparkles } from "lucide-react";
import { useFourMemeDeploy, type DeployStage } from "@/lib/web3/useFourMemeDeploy";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { generateCulturalToken } from "@/lib/dgrid";
import { generateTokenLore } from "@/lib/tokenBreeder";
import { isGeminiAvailable } from "@/lib/gemini";

const STEPS = [
  "Engine Evaluation",
  "Cultural Synthesis",
  "Dashboard Alert",
  "Four.Meme Auth",
  "create-instant",
  "BNB Chain LIVE",
];

/** Map deploy stage to pipeline step index */
const stageToStep: Record<DeployStage, number> = {
  idle: 2,
  authenticating: 3,
  preparing: 4,
  confirming: 4,
  deploying: 5,
  success: 6,
  error: 2,
};

const Graduation = () => {
  const [graduated, setGraduated] = useState(false);
  const [generatingCulture, setGeneratingCulture] = useState(false);
  const [tokenData, setTokenData] = useState<{name: string, symbol: string, description: string} | null>(null);
  const [tokenLore, setTokenLore] = useState<string | null>(null);
  
  const [sweep, setSweep] = useState(false);
  const {
    deploy,
    reset,
    stage,
    error: deployError,
    result,
    isConnected,
  } = useFourMemeDeploy();
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();

  /** Current pipeline step based on deploy stage */
  const progress = stageToStep[stage];

  /** Simulated deploy — steps through UI without real TX */
  const [simDeploying, setSimDeploying] = useState(false);
  const [simStep, setSimStep] = useState(2);
  const [simDone, setSimDone] = useState(false);
  
  // MYX Finance V2 Simulation States
  const [myxTvl, setMyxTvl] = useState(0);
  const [myxDeployed, setMyxDeployed] = useState(false);

  const simulateDeploy = () => {
    setSimDeploying(true);
    let i = 2;
    const tick = () => {
      i += 1;
      setSimStep(i);
      if (i < STEPS.length) setTimeout(tick, 600);
      else {
        setSimDone(true);
        setSweep(true);
        setTimeout(() => setSweep(false), 900);
      }
    };
    tick();
  };

  /** Real deploy — calls Four.Meme contract */
  const handleRealDeploy = async () => {
    if (!isConnected) {
      openConnectModal?.();
      return;
    }
    if (tokenData) {
        await deploy({ ...tokenData, imageUrl: "", twitter: "" });
        setSweep(true);
        setTimeout(() => setSweep(false), 900);
    }
  };

  const triggerGraduation = async () => {
     setGraduated(true);
     setGeneratingCulture(true);
     setTokenLore(null);
     // Generate cultural token via Gemma 4 31B-IT
     const data = await generateCulturalToken();
     setTokenData(data);
     // Generate AI lore for the graduated token
     try {
       const lore = await generateTokenLore({
         name: data.name,
         symbol: data.symbol,
         narrative: data.description,
         vibe: "Evolved · Battle-tested · Viral",
         logoSeed: "0xGRAD...FINAL",
       });
       setTokenLore(lore);
     } catch {
       setTokenLore(null);
     }
     setGeneratingCulture(false);
  }

  // Use sim progress for display if in sim mode, otherwise real
  const displayProgress = simDeploying ? simStep : progress;
  const isDeploying = simDeploying || ["authenticating", "preparing", "confirming", "deploying"].includes(stage);
  const isSuccess = simDone || stage === "success";

  // MYX Finance TVL Tracker Simulation
  useEffect(() => {
    if (isSuccess && !myxDeployed) {
      let currentTvl = 0;
      const target = 20000;
      const interval = setInterval(() => {
        // Simulated organic TVL growth after Four.Meme launch
        currentTvl += Math.floor(Math.random() * 1500) + 500;
        if (currentTvl >= target) {
          currentTvl = target;
          setMyxDeployed(true);
          clearInterval(interval);
        }
        setMyxTvl(currentTvl);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isSuccess, myxDeployed]);

  return (
    <section className="mx-auto max-w-[1440px] px-6 pt-10 pb-16 relative overflow-hidden">
      {sweep && <div className="pointer-events-none absolute left-0 right-0 top-0 h-[3px] bg-infrared infrared-sweep z-20" />}

      <p className="mono mb-3">/ GRADUATION // MAINNET DEPLOYMENT CONTROL</p>

      {/* Status panel */}
      <VaultCard className="mb-10 min-h-[300px] flex flex-col justify-center">
        {!graduated ? (
          <div className="text-center py-6">
            <p className="mono mb-3">STATUS: EVOLVING</p>
            <div className="display text-[clamp(2rem,6vw,5rem)]">BEST FITNESS 0.847 / TARGET 0.900</div>
            <p className="mono mt-4">ESTIMATED GENERATIONS REMAINING: ~12</p>
            <button onClick={triggerGraduation} className="btn-secondary mt-6">SIMULATE THRESHOLD REACHED</button>
          </div>
        ) : generatingCulture ? (
          <div className="text-center py-12 flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-aave-purple animate-spin mb-6" />
            <p className="font-mono text-[14px] text-aave-purple uppercase tracking-widest flash-dot flex items-center gap-3">
               <Sparkles className="w-4 h-4" />
               GEMMA 4 31B-IT // SYNTHESIZING CULTURE...
            </p>
            <p className="font-mono text-[10px] text-ink/40 mt-4 uppercase max-w-md mx-auto">
               Google AI Studio → Cultural crossover + narrative generation + lore synthesis...
            </p>
          </div>
        ) : isSuccess ? (
          <div className="text-center py-6">
            <p className="font-mono uppercase tracking-[0.1em] text-[hsl(51,100%,50%)] text-[14px] mb-3">🎉 TOKEN DEPLOYED ON BNB CHAIN</p>
            <div className="font-display font-bold uppercase text-[clamp(2rem,5vw,4rem)] text-aave-purple drop-shadow-md">
              <ScrambleText value={tokenData?.name || "ERROR"} />
            </div>
            <p className="font-mono mt-2 text-ink uppercase">${tokenData?.symbol}</p>
            <p className="font-mono mt-4 text-[10px] text-ink/60 uppercase max-w-md mx-auto italic">"{tokenData?.description}"</p>
            {tokenLore && (
              <div className="mt-4 max-w-lg mx-auto border border-aave-purple/20 bg-aave-purple/5 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-3 h-3 text-aave-purple" />
                  <span className="font-mono text-[9px] text-aave-purple uppercase tracking-widest">AI-GENERATED LORE // GEMMA 4</span>
                </div>
                <p className="font-mono text-[11px] text-ink/70 leading-relaxed">{tokenLore}</p>
              </div>
            )}
            <p className="mono mt-6 text-graphite">FITNESS: 0.912 · GENERATION: 47 · STATUS: LIVE</p>

            {result && (
              <div className="mt-6 space-y-3 text-left max-w-lg mx-auto border border-ink/20 p-5">
                <div className="flex justify-between font-mono text-[11px] uppercase tracking-widest">
                  <span className="text-graphite">TX HASH</span>
                  <a
                    href={result.bscscanUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-infrared flex items-center gap-1 hover:underline"
                  >
                    {result.txHash.slice(0, 10)}...{result.txHash.slice(-8)}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <div className="flex justify-between font-mono text-[11px] uppercase tracking-widest">
                  <span className="text-graphite">TOKEN</span>
                  <span>{result.tokenAddress.slice(0, 10)}...{result.tokenAddress.slice(-6)}</span>
                </div>
                <div className="flex justify-between font-mono text-[11px] uppercase tracking-widest">
                  <span className="text-graphite">FOUR.MEME</span>
                  <a href={result.fourMemeUrl} target="_blank" rel="noreferrer" className="text-infrared flex items-center gap-1 hover:underline">
                    VIEW ON FOUR.MEME <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            )}

            {!result && (
              <div className="mt-6 border border-ink/20 p-5 max-w-lg mx-auto">
                <p className="font-mono text-[11px] uppercase tracking-widest text-graphite text-center">SIMULATED DEPLOYMENT — CONNECT WALLET FOR REAL TX</p>
              </div>
            )}

            {/* MYX Finance V2 Integration */}
             <div className="mt-12 text-left max-w-2xl mx-auto border-[2px] border-[#0A84FF]/20 bg-[#0A84FF]/5 p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0A84FF]" />
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-mono text-[16px] font-bold text-[#0A84FF] tracking-widest flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" /> 
                    MYX FINANCE V2 INTEGRATION
                  </h3>
                  <div className="font-mono text-[10px] bg-[#0A84FF]/10 text-[#0A84FF] px-2 py-1 uppercase tracking-widest border border-[#0A84FF]/30">
                    {myxDeployed ? "MARKET LIVE" : "AWAITING TVL"}
                  </div>
                </div>
                <p className="font-mono text-[11px] text-ink/70 uppercase tracking-widest mb-6">
                  Automated Perpetual Market Provisioning via MYX SDK. Triggers when Four.Meme bonded TVL exceeds $20,000 threshold.
                </p>
                
                <div className="space-y-4 font-mono text-[12px] uppercase">
                  <div className="flex justify-between border-b border-[#0A84FF]/20 pb-2">
                    <span className="text-graphite">FOUR.MEME TVL TRACKER</span>
                    <span className="text-ink font-bold">${myxTvl.toLocaleString()} / $20,000</span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full h-[4px] bg-ink/10 relative mt-2 mb-4 overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-[#0A84FF] transition-all duration-300"
                      style={{ width: `${Math.min((myxTvl / 20000) * 100, 100)}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between border-b border-[#0A84FF]/20 pb-2">
                    <span className="text-graphite">QUANTUM_DOGE-USD PERP MARKET</span>
                    <span className={myxDeployed ? "text-success-gold font-bold" : "text-ink/40"}>
                       {myxDeployed ? "INITIALIZED (V2)" : "LOCKED"}
                    </span>
                  </div>
                </div>
                
                {myxDeployed && (
                  <div className="mt-6 flex items-center gap-3 font-mono text-[11px] text-success-gold uppercase tracking-widest">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    SYNCING LIQUIDITY POOL WITH MYX MATCHING ENGINE...
                  </div>
                )}
             </div>

          </div>
        ) : (
          <div className="text-center py-4">
            <p className="font-mono uppercase tracking-[0.1em] text-infrared text-[14px] mb-3 flash-dot">🚨 GRADUATION ALERT</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="border border-ink p-5">
                <p className="mono mb-1">TOKEN</p>
                <div className="font-display font-bold uppercase text-[28px] text-aave-purple">
                  <ScrambleText value={tokenData?.name || "ERROR"} />
                </div>
                <p className="font-mono text-[12px] text-ink/60 mt-1">${tokenData?.symbol}</p>
                <p className="mono mt-3">FITNESS</p>
                <div className="display text-[40px]">0.912</div>
                {tokenData?.description && (
                  <p className="font-mono text-[10px] text-ink/50 mt-3 italic leading-relaxed">"{tokenData.description}"</p>
                )}
                {tokenLore && (
                  <div className="mt-4 border border-aave-purple/20 bg-aave-purple/5 p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-3 h-3 text-aave-purple" />
                      <span className="font-mono text-[9px] text-aave-purple uppercase tracking-widest">AI-GENERATED LORE // GEMMA 4</span>
                    </div>
                    <p className="font-mono text-[10px] text-ink/70 leading-relaxed">{tokenLore}</p>
                  </div>
                )}
              </div>
              <div className="border border-ink p-5 font-mono text-[12px] uppercase tracking-[0.08em] space-y-2">
                <div className="flex justify-between border-b border-ink/10 pb-1"><span className="text-graphite">GENERATION</span><span>47</span></div>
                <div className="flex justify-between border-b border-ink/10 pb-1"><span className="text-graphite">HOLDER GROWTH</span><span>+289%</span></div>
                <div className="flex justify-between border-b border-ink/10 pb-1"><span className="text-graphite">VOLUME</span><span>1.2M SIM</span></div>
                <div className="flex justify-between border-b border-ink/10 pb-1"><span className="text-graphite">CHAIN</span><span>BNB MAINNET</span></div>
                <div className="flex justify-between"><span className="text-graphite">WALLET</span><span>{isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : "NOT CONNECTED"}</span></div>
              </div>
            </div>

            {deployError && (
              <div className="mt-4 border border-[hsl(354,96%,43%)]/30 bg-[hsl(354,96%,43%)]/5 p-3">
                <p className="font-mono text-[11px] uppercase tracking-widest text-[hsl(354,96%,43%)]">⚠ {deployError}</p>
                <button onClick={reset} className="mono text-[10px] underline mt-1 text-ink/60">RETRY</button>
              </div>
            )}
          </div>
        )}
      </VaultCard>

      {/* Pipeline */}
      <VaultCard label="DEPLOYMENT PIPELINE" className="mb-10">
        <div className="overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max py-2">
            {STEPS.map((s, i) => {
              const done = i < displayProgress;
              const current = i === displayProgress;
              return (
                <div key={s} className="flex items-center">
                  <div
                    className={[
                      "px-4 py-3 border min-w-[140px] text-center font-mono text-[11px] uppercase tracking-[0.08em] transition-colors",
                      done ? "bg-ink text-canvas border-ink" : "",
                      current ? "border-infrared text-ink animate-pulse" : "",
                      !done && !current ? "bg-ash text-graphite border-ink/30" : "",
                    ].join(" ")}
                  >
                    {isSuccess && i === STEPS.length - 1 ? "✅ LIVE ON BNB CHAIN" : s}
                  </div>
                  {i < STEPS.length - 1 && <ArrowRight className="h-4 w-4 mx-1 text-ink/60" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Current stage status text */}
        {isDeploying && (
          <div className="mt-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-infrared">
            <Loader2 className="h-3 w-3 animate-spin" />
            {stage === "authenticating" && "SIGNING AUTH MESSAGE..."}
            {stage === "preparing" && "PREPARING TOKEN ON FOUR.MEME..."}
            {stage === "confirming" && "WAITING FOR WALLET CONFIRMATION..."}
            {stage === "deploying" && "TX SUBMITTED — MINING..."}
            {simDeploying && !["authenticating", "preparing", "confirming", "deploying"].includes(stage) && "SIMULATING DEPLOYMENT PIPELINE..."}
          </div>
        )}
      </VaultCard>

      {/* Action area */}
      <div className="grid grid-cols-12 gap-6 items-center">
        <div className="col-span-12 md:col-span-4">
          <button
            onClick={handleRealDeploy}
            disabled={!graduated || isDeploying || isSuccess}
            className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {!isConnected ? "CONNECT WALLET & DEPLOY →" :
              isDeploying ? "DEPLOYING..." :
              "🔗 DEPLOY TO BNB CHAIN →"}
          </button>
        </div>
        <div className="col-span-12 md:col-span-4">
          <button
            onClick={simulateDeploy}
            disabled={!graduated || isDeploying || isSuccess}
            className="btn-secondary w-full disabled:opacity-40 disabled:cursor-not-allowed"
          >
            SIMULATE DEPLOY (DEMO) →
          </button>
        </div>
        <div className="col-span-12 md:col-span-4 text-right">
          <button
            onClick={() => { setGraduated(false); reset(); setSimDeploying(false); setSimStep(2); setSimDone(false); setMyxTvl(0); setMyxDeployed(false); }}
            className="btn-secondary"
          >
            REJECT — CONTINUE EVOLUTION →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Graduation;
