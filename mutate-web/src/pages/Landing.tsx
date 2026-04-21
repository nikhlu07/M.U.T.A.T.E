import { Link } from "react-router-dom";
import { ScrambleText } from "@/components/ScrambleText";
import { motion } from "framer-motion";
import { VaultCard } from "@/components/VaultCard";
import { StatusDot } from "@/components/StatusDot";
import { heroData } from "@/data/mockData";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const fmt = (n: number) => n.toLocaleString("en-US");

const Sparkline = ({ data }: { data: number[] }) => {
  const w = 160, h = 36;
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * h}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-9">
      <polyline points={pts} fill="none" stroke="hsl(var(--infrared))" strokeWidth="1.5" />
    </svg>
  );
};

const FitnessBars = () => {
  const metrics = [
    { label: "ORG. HOLDER", val: 35, primary: true },
    { label: "TEMPORAL DY", val: 25 },
    { label: "TRADE VOLM", val: 20 },
    { label: "LIQ. DEPTH", val: 12 },
    { label: "SOCIAL SP.", val: 8 },
  ];
  return (
    <div className="flex flex-col gap-3 mt-4">
      {metrics.map(m => (
        <motion.div
          key={m.label}
          whileHover={{ scale: 1.02 }}
          className={`flex flex-col border p-3 backdrop-blur-sm transition-all relative overflow-hidden ${m.primary
              ? "border-infrared/30 bg-canvas/90 shadow-[0_0_15px_rgba(255,0,0,0.05)] hover:border-infrared/50"
              : "border-ink/10 bg-canvas/60 hover:border-ink/30"
            }`}
        >
          <div className={`absolute top-0 left-0 w-1 h-full ${m.primary ? 'bg-infrared animate-pulse' : 'bg-ink/20'}`} />
          <div className="flex justify-between items-center z-10 w-full mb-2 pl-2">
            <span className="font-mono text-[9px] text-ink/60 uppercase tracking-widest">{m.label} //</span>
            <span className={`font-mono text-[11px] font-bold ${m.primary ? 'text-infrared' : 'text-ink'}`}>{m.val}%</span>
          </div>
          <div className="w-full h-[2px] bg-ink/10 relative z-10 ml-2">
            <div className={`h-full ${m.primary ? 'bg-infrared' : 'bg-ink/40'}`} style={{ width: `${m.val}%` }} />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const EngineNodes = () => (
  <div className="flex flex-col items-center justify-center gap-6 mt-6 relative w-full">
    <div className="flex flex-wrap items-center justify-center gap-4 w-full">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-3 border border-ink/10 px-4 py-3 bg-canvas/80 backdrop-blur-sm shadow-sm transition-all hover:border-ink/30 relative overflow-hidden flex-1"
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-ink/20" />
        <span className="font-mono text-[9px] text-ink/60 uppercase tracking-widest z-10">ENGINE A //</span>
        <span className="font-mono font-bold text-ink text-[11px] z-10 text-right w-full">CMA-ES</span>
      </motion.div>

      <div className="text-ink/40 text-lg font-bold font-mono">×</div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-3 border border-ink/10 px-4 py-3 bg-canvas/80 backdrop-blur-sm shadow-sm transition-all hover:border-ink/30 relative overflow-hidden flex-1"
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-ink/20" />
        <span className="font-mono text-[9px] text-ink/60 uppercase tracking-widest z-10">ENGINE B //</span>
        <span className="font-mono font-bold text-ink text-[11px] z-10 text-right w-full">GEMMA 4</span>
      </motion.div>
    </div>

    <div className="h-[2px] w-16 bg-ink/10 rounded-full" />

    <motion.div
      initial={{ scale: 0.98 }}
      animate={{ scale: 1 }}
      transition={{ repeat: Infinity, repeatType: "reverse", duration: 3, ease: "easeInOut" }}
      className="flex items-center justify-between w-full border-[2px] border-aave-purple/20 px-5 py-4 bg-canvas/90 backdrop-blur-md shadow-[0_0_20px_rgba(186,85,211,0.05)] relative overflow-hidden group-hover:border-aave-purple/40 transition-colors duration-500"
    >
      <div className="absolute top-0 left-0 w-1.5 h-full bg-aave-purple" />
      <span className="font-mono text-[10px] uppercase tracking-widest text-ink/60">OUTCOME //</span>
      <span className="font-mono font-bold text-[13px] uppercase tracking-widest bg-gradient-to-r from-ink via-aave-purple to-ink bg-clip-text text-transparent drop-shadow-sm">SLERP CROSSOVER</span>
    </motion.div>
  </div>
);

const EvolutionMatrix = () => {
  const [activeNodes, setActiveNodes] = useState<number[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const mutations = ["CMA-ES DELTA Δ", "SLERP CROSSOVER", "FITNESS REEVAL", "GENOME MERGE", "ORACLE SYNC", "SWARM PERTURB_15K"];

    const int = setInterval(() => {
      const newNodes = Array.from({ length: 24 }, () => Math.floor(Math.random() * 120));
      setActiveNodes(newNodes);

      if (Math.random() > 0.6) {
        setLogs(prev => {
          const l = [mutations[Math.floor(Math.random() * mutations.length)] + ` // ${Date.now().toString().slice(-6)}`, ...prev];
          return l.slice(0, 5);
        });
      }
    }, 250);

    return () => clearInterval(int);
  }, []);

  return (
    <div className="w-full h-full flex flex-col p-6 bg-canvas/40 border border-ink/10 backdrop-blur-md relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-infrared/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="font-mono text-ink/80 font-bold border-b border-ink/20 pb-3 mb-6 uppercase text-[10px] flex justify-between items-center tracking-widest relative z-10">
        <span>LIVE // CMA-ES TENSOR MUTATION</span>
        <span className="text-infrared flash-dot flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-infrared rounded-full shadow-[0_0_8px_rgba(255,0,0,0.8)]" /> REC
        </span>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-1 content-start mt-2 relative z-10">
        {Array.from({ length: 120 }).map((_, i) => (
          <div
            key={i}
            className={`aspect-square transition-all duration-100 ${activeNodes.includes(i) ? 'bg-infrared border border-red-400 shadow-[0_0_10px_rgba(255,0,0,0.6)]' : 'bg-ink/[0.03] border border-ink/[0.05]'
              }`}
          />
        ))}
      </div>

      <div className="h-[90px] mt-6 border-t border-ink/20 pt-3 font-mono text-[9px] text-ink/50 overflow-hidden flex flex-col gap-1 tracking-wider uppercase relative z-10">
        {logs.map((log, i) => (
          <div key={i} className={i === 0 ? "text-infrared font-bold" : "opacity-60"}>{'> ' + log}</div>
        ))}
      </div>
    </div>
  );
};

const Landing = () => {
  const { activeAgents, generation, bestFitness, targetFitness, populationSize, topPerformer, agentBreakdown } = heroData;
  return (
    <section className="bg-canvas text-ink min-h-screen relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-infrared/20 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-[1440px] px-6 pt-16 pb-12 relative z-10">
        {/* HUGE TACTICAL HERO REDESIGN */}
        <div className="min-h-[80vh] flex flex-col justify-center border-b-[2px] border-ink/20 pb-24 mb-16 relative mt-4">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-infrared/80 to-transparent shadow-[0_0_10px_rgba(255,0,0,0.5)]" />

          {/* Top telemetry bar */}
          <div className="flex justify-between items-center mb-12 w-full border border-ink/10 bg-canvas/40 px-6 py-3 backdrop-blur-sm">
            <span className="font-mono text-[10px] text-ink/50 tracking-[0.3em] uppercase">SYSTEM.STATUS // <span className="text-success-gold font-bold">OPTIMAL</span></span>
            <span className="font-mono text-[10px] text-ink/50 tracking-[0.3em] uppercase hidden md:block">LATENCY: <span className="text-ink">12MS</span></span>
            <span className="font-mono text-[10px] text-ink/50 tracking-[0.3em] uppercase">NODE // <span className="text-infrared font-bold animate-pulse">0x8B3...F9A</span></span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start relative z-10 w-full mb-16">

            {/* Left: Giant Typography & Metrics */}
            <div className="lg:col-span-7 flex flex-col relative">
              <div className="absolute top-0 -left-6 w-1 h-full bg-infrared shadow-[0_0_20px_rgba(255,0,0,0.5)]" />
              <p className="font-mono text-infrared mb-4 text-[12px] uppercase tracking-[0.4em] font-bold">
                Evolutionary Memecoin Engine
              </p>

              <h1 className="font-display font-black uppercase text-[clamp(4.5rem,12vw,12rem)] leading-[0.8] text-ink drop-shadow-[0_0_30px_rgba(255,255,255,0.15)] mb-8 tracking-tighter">
                M.U.T.<br />A.T.E.
              </h1>

              <div className="flex flex-col gap-4">
                <div className="font-mono text-[16px] text-ink/80 flex items-center gap-4 bg-canvas/80 border border-ink/20 px-6 py-4 uppercase tracking-widest w-fit shadow-lg shadow-black/50">
                  <span className="w-3 h-3 bg-infrared rounded-full animate-ping absolute" />
                  <span className="w-3 h-3 bg-infrared rounded-full relative z-10" />
                  <ScrambleText value={fmt(activeAgents)} />
                  <span className="text-ink/40">AGENTS DEPLOYED</span>
                </div>
              </div>
            </div>

            {/* Right: Evolution Matrix & Controls */}
            <div className="lg:col-span-5 h-full flex flex-col relative w-full">
              <div className="border-[2px] border-ink/10 bg-canvas/60 p-[2px] relative overflow-hidden flex-1 min-h-[300px]">
                <div className="absolute top-0 right-0 w-8 h-8 border-t-[2px] border-r-[2px] border-infrared z-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[2px] border-l-[2px] border-infrared z-20 pointer-events-none" />
                <EvolutionMatrix />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col border-[2px] border-ink/10 px-5 py-4 bg-canvas/80 shadow-md relative group">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-ink/20 group-hover:bg-ink transition-colors" />
                  <span className="font-mono text-[10px] text-ink/50 uppercase tracking-[0.2em] mb-2">GENERATION</span>
                  <span className="font-mono font-black text-ink text-[24px] tracking-tight">{generation.current} <span className="text-[12px] text-ink/40 font-normal tracking-widest">/ {generation.total}</span></span>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col border-[2px] border-infrared/30 px-5 py-4 bg-canvas/90 shadow-[0_0_20px_rgba(255,0,0,0.08)] relative group">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-infrared animate-pulse" />
                  <span className="font-mono text-[10px] text-infrared uppercase tracking-[0.2em] mb-2">BEST FITNESS</span>
                  <span className="font-mono font-black text-ink text-[24px] tracking-tight">{bestFitness.toFixed(3)}</span>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="w-full relative z-20">
            <Link to="/evolution" className="w-full bg-infrared hover:bg-ink text-canvas font-ui font-black uppercase text-[18px] py-6 tracking-[0.2em] flex items-center justify-center gap-4 transition-all duration-300 shadow-[0_0_40px_rgba(255,0,0,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              INITIATE EVOLUTION MONITOR <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* 30% control panel */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          {/* Box 1 */}
          <VaultCard label="ACTIVE GENERATION">
            <div className="font-display text-[56px] leading-[0.9] text-ink">GEN {generation.current}</div>
            <p className="font-mono text-[10px] text-ink/40 mt-4 uppercase">POPULATION: <span className="text-ink/80">{populationSize} Tokens</span></p>
          </VaultCard>

          {/* Box 2 */}
          <VaultCard>
            <div className="font-mono text-[11px] tracking-widest mb-4 flex items-center justify-between">
              <span className="text-ink/50">TOP PERFORMER</span>
              <span className="text-infrared font-bold">{topPerformer.name}</span>
            </div>
            <div className="font-display text-[56px] leading-[0.9] text-ink mb-4">{topPerformer.fitness.toFixed(3)}</div>
            <Sparkline data={topPerformer.holderGrowth} />
            <p className="font-mono text-[10px] text-ink/40 mt-3 uppercase">Holder Growth 10D</p>
          </VaultCard>

          {/* Box 3 */}
          <VaultCard label="SWARM STATUS">
            <div className="font-display text-[40px] leading-none text-ink mb-4">{fmt(activeAgents)}</div>
            <ul className="space-y-2 font-mono text-[10px] text-ink/50 uppercase tracking-wider">
              <li className="flex justify-between border-b border-ink/5 pb-1"><span>MOMENTUM</span><span className="text-ink">{fmt(agentBreakdown.momentumTraders)}</span></li>
              <li className="flex justify-between border-b border-ink/5 pb-1"><span>DIAMOND</span><span className="text-ink">{fmt(agentBreakdown.diamondHands)}</span></li>
              <li className="flex justify-between"><span>SPECULATOR</span><span className="text-ink">{fmt(agentBreakdown.speculators)}</span></li>
            </ul>
          </VaultCard>

          {/* Box 4 */}
          <VaultCard label="TARGET CHAIN">
            <div className="font-display text-[40px] leading-[0.9] text-ink">BNB CHAIN</div>
            <p className="font-mono text-[10px] text-infrared mt-3 uppercase">FOUR.MEME SDK</p>
            <div className="mt-6 flex items-center gap-2 border border-ink/10 bg-ink/[0.02] px-3 py-2 w-fit">
              <StatusDot color="success-gold" />
              <span className="font-mono text-[9px] text-ink/80 uppercase">CONNECTION READY</span>
            </div>
          </VaultCard>
        </div>

        {/* SYSTEM ARCHITECTURE */}
        <div className="mt-32 pt-16 border-t border-ink/10 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-ink/20 to-transparent" />
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-display font-bold uppercase text-6xl text-ink">SYSTEM ARCHITECTURE</h2>
              <div className="flex gap-3 mt-3">
                <span className="bg-ink/10 text-ink px-3 py-1 text-[10px] font-mono uppercase tracking-widest">DECOUPLED EVOLUTION</span>
                <span className="bg-ink/10 text-ink px-3 py-1 text-[10px] font-mono uppercase tracking-widest">REAL-TIME VALIDATION</span>
              </div>
            </div>
            <div className="border border-ink/20 px-4 py-2 flex items-center gap-3 bg-ink/5 font-mono text-[10px] text-ink/80 uppercase">
              STATUS <StatusDot color="success-gold" /> AUDITABLE
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Box 1: Swarm */}
            <VaultCard className="p-2">
              <div className="font-mono text-infrared text-[10px] mb-4 mt-2">01.</div>
              <h3 className="font-mono text-ink font-bold mb-4 border-b border-ink/10 pb-3 uppercase tracking-widest text-[13px]">SYNTHETIC SWARM</h3>

              <div className="flex flex-col gap-3 mt-4">
                <motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-between border border-ink/10 px-4 py-3 bg-canvas/80 backdrop-blur-sm shadow-sm transition-all hover:border-ink/30 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-ink/20" />
                  <span className="font-mono text-[9px] text-ink/60 uppercase tracking-widest relative z-10">ENGINE //</span>
                  <span className="font-mono font-bold text-ink text-[11px] relative z-10">DOUBLE_AUCTION</span>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-between border border-ink/10 px-4 py-3 bg-canvas/80 backdrop-blur-sm shadow-sm transition-all hover:border-ink/30 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-ink/20" />
                  <span className="font-mono text-[9px] text-ink/60 uppercase tracking-widest relative z-10">AGENTS //</span>
                  <span className="font-mono font-bold text-ink text-[11px] relative z-10 px-2 py-0.5 bg-ink/5">15,000+ AI</span>
                </motion.div>
                <div className="h-[2px] w-12 bg-ink/10 rounded-full mx-auto my-1" />
                <motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-between border border-infrared/20 px-4 py-3 bg-canvas/90 backdrop-blur-sm shadow-[0_0_15px_rgba(255,0,0,0.05)] transition-all hover:border-infrared/40 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-infrared animate-pulse" />
                  <span className="font-mono text-[9px] text-ink/60 uppercase tracking-widest relative z-10">LATENCY //</span>
                  <span className="font-mono font-bold text-infrared text-[11px] relative z-10">NANOSECOND</span>
                </motion.div>
              </div>
            </VaultCard>

            {/* Box 2: Fitness */}
            <VaultCard className="p-2">
              <div className="font-mono text-infrared text-[10px] mb-4 mt-2">02.</div>
              <h3 className="font-mono text-ink font-bold mb-4 border-b border-ink/10 pb-3 uppercase tracking-widest text-[13px]">HYBRID FITNESS</h3>

              <FitnessBars />
            </VaultCard>

            {/* Box 3: Engine */}
            <VaultCard className="p-2" accentColor="aave-purple">
              <div className="font-mono text-aave-purple text-[10px] mb-4 mt-2">03.</div>
              <h3 className="font-mono text-ink font-bold mb-4 border-b border-ink/10 pb-3 uppercase tracking-widest text-[13px]">DUAL-ENGINE BLEND</h3>

              <EngineNodes />
            </VaultCard>
          </div>
        </div>

        {/* SWARM TAXONOMY */}
        <div className="mt-32 pt-16 border-t border-ink/10 pb-24 relative">
          <div className="absolute top-0 left-0 w-1/4 h-[1px] bg-gradient-to-r from-transparent via-infrared/50 to-transparent" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 flex flex-col">
              <h2 className="font-display font-bold uppercase text-6xl text-ink">SWARM TAXONOMY</h2>
              <div className="w-12 h-[2px] bg-infrared mt-8 mb-8 shadow-[0_0_10px_rgba(255,0,0,0.5)]"></div>

              <div className="flex flex-col gap-4">
                <motion.div whileHover={{ scale: 1.02 }} className="flex justify-between items-center bg-canvas/80 border border-ink/10 px-5 py-4 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-infrared" />
                  <span className="font-mono text-[10px] text-ink/60 uppercase tracking-widest pl-2">LOSS AVERSION //</span>
                  <StatusDot color="infrared" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} className="flex justify-between items-center bg-canvas/80 border border-ink/10 px-5 py-4 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-success-gold" />
                  <span className="font-mono text-[10px] text-ink/60 uppercase tracking-widest pl-2">HERDING COEF. //</span>
                  <StatusDot color="success-gold" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} className="flex justify-between items-center bg-canvas/80 border border-ink/10 px-5 py-4 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-aave-purple" />
                  <span className="font-mono text-[10px] text-ink/60 uppercase tracking-widest pl-2">NARRATIVE SENS. //</span>
                  <StatusDot color="aave-purple" />
                </motion.div>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { name: "MOMENTUM TRADERS", tag: "[FOMO]", val1: "TREND FLW.", val2: "HIGH TRN.", score: 0.91 },
                { name: "DIAMOND HANDS", tag: "[HODL]", val1: "LOSS AVSN.", val2: "LOW RISK", score: 0.88 },
                { name: "SPECULATORS", tag: "[DEGEN]", val1: "HIGH RISK", val2: "QCK FLIP", score: 0.94 },
                { name: "HERD FOLLOWERS", tag: "[CROWD]", val1: "LATE ADPT.", val2: "SOC. PROOF", score: 0.76 },
              ].map(t => (
                <VaultCard key={t.name} className="!p-5">
                  <div className="flex flex-col h-full bg-canvas/60">
                    <div className="flex items-center justify-between mb-5 border-b border-ink/10 pb-3">
                      <span className="font-mono text-[10px] text-ink/50 uppercase tracking-widest">PROFILE //</span>
                      <span className="font-mono font-bold text-ink text-[12px]">{t.name}</span>
                    </div>

                    <div className="flex items-center justify-center gap-3 w-full mb-6">
                      <motion.div whileHover={{ scale: 1.05 }} className="flex-1 flex flex-col items-center justify-center border border-ink/10 px-2 py-3 bg-canvas/80 group/inner">
                        <span className="font-mono text-[9px] text-ink/40 mb-1">VEC_A</span>
                        <span className="font-mono text-[10px] text-ink font-bold group-hover/inner:text-infrared transition-colors">{t.val1}</span>
                      </motion.div>
                      <span className="text-ink/30 font-bold font-mono">×</span>
                      <motion.div whileHover={{ scale: 1.05 }} className="flex-1 flex flex-col items-center justify-center border border-ink/10 px-2 py-3 bg-canvas/80 group/inner">
                        <span className="font-mono text-[9px] text-ink/40 mb-1">VEC_B</span>
                        <span className="font-mono text-[10px] text-ink font-bold group-hover/inner:text-infrared transition-colors">{t.val2}</span>
                      </motion.div>
                    </div>

                    <div className="mt-auto flex items-center justify-between border-[2px] border-ink/5 px-4 py-3 bg-canvas/40 relative">
                      <div className="absolute top-0 left-0 w-1 h-full bg-graphite" />
                      <span className="font-mono text-[9px] text-ink/60 tracking-widest uppercase pl-1">CONFIDENCE //</span>
                      <span className="font-mono font-bold text-ink">{t.score}</span>
                    </div>
                  </div>
                </VaultCard>
              ))}
            </div>
          </div>
        </div>

        {/* NEW SECTION: NETWORK DIAGNOSTICS */}
        <div className="mt-16 pt-16 border-t border-ink/10 pb-24 relative">
          <h2 className="font-display font-bold uppercase text-6xl text-ink mb-8">NETWORK DIAGNOSTICS</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <VaultCard className="col-span-1 md:col-span-3 !p-0">
              <div className="h-[200px] bg-canvas/5 relative overflow-hidden flex flex-col justify-end p-4">
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="w-2 h-2 bg-infrared animate-ping" />
                  <span className="font-mono text-[9px] text-ink/60 tracking-widest uppercase">REAL-TIME TRAFFIC FLOW</span>
                </div>
                <div className="w-full flex items-end justify-between h-24 gap-1">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div key={i} className="flex-1 bg-infrared/40" style={{ height: `${Math.max(10, Math.random() * 100)}%` }} />
                  ))}
                </div>
              </div>
            </VaultCard>

            <VaultCard className="col-span-1 md:col-span-1 !p-4">
              <div className="flex flex-col gap-4 h-full justify-between">
                <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col border border-ink/10 px-3 py-2 bg-canvas/80 relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-ink/20" />
                  <span className="font-mono text-[9px] text-ink/40 mb-1 tracking-widest pl-2">LAST SYNC //</span>
                  <span className="font-mono text-[14px] text-ink pl-2 font-bold">{Date.now().toString().slice(-6)} MS</span>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col border border-ink/10 px-3 py-2 bg-canvas/80 relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-success-gold" />
                  <span className="font-mono text-[9px] text-ink/40 mb-1 tracking-widest pl-2">BLOCK HEIGHT //</span>
                  <span className="font-mono text-[14px] text-success-gold pl-2 font-bold">14,293,101</span>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col border border-ink/10 px-3 py-2 bg-canvas/80 relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-infrared" />
                  <span className="font-mono text-[9px] text-ink/40 mb-1 tracking-widest pl-2">GAS AVERAGE //</span>
                  <span className="font-mono text-[14px] text-infrared pl-2 font-bold">4 GWEI</span>
                </motion.div>
              </div>
            </VaultCard>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Landing;
