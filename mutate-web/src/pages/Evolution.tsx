import { useState } from "react";
import { VaultCard } from "@/components/VaultCard";
import { AgentBadge } from "@/components/AgentBadge";
import { LinearPacer } from "@/components/LinearPacer";
import { CovarianceMatrix } from "@/visualizations/CovarianceMatrix";
import { SlerpArc } from "@/visualizations/SlerpArc";
import { PhylogeneticTree } from "@/visualizations/PhylogeneticTree";
import { cmaParams, culturalGenome } from "@/data/mockData";
import { motion } from "framer-motion";
import { Loader2, Sparkles, Dna, Zap } from "lucide-react";
import { breedTokenCulture, mutateTokenCulture, type CulturalGenome, type BreedingResult } from "@/lib/tokenBreeder";
import { isGeminiAvailable } from "@/lib/gemini";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 20 } 
  }
};

// Default parents (can be overridden by AI)
const DEFAULT_PARENT_A: CulturalGenome = {
  name: "GALAXY_PEPE_V31",
  symbol: "GPEPE",
  narrative: "Intergalactic frog vibes transcending dimensional boundaries",
  vibe: "Cosmic · Memetic · Transcendent",
  logoSeed: "0xA1B2...C3D4",
};

const DEFAULT_PARENT_B: CulturalGenome = {
  name: "MOON_SHIB_V32",
  symbol: "MSHIB",
  narrative: "Lunar canine governance token for zero-gravity hodlers",
  vibe: "Lunar · Faithful · Deflationary",
  logoSeed: "0xE5F6...G7H8",
};

const Evolution = () => {
  const [breeding, setBreeding] = useState(false);
  const [breedResult, setBreedResult] = useState<BreedingResult | null>(null);
  const [mutating, setMutating] = useState(false);
  const [mutatedGenome, setMutatedGenome] = useState<CulturalGenome | null>(null);
  const [parentA] = useState(DEFAULT_PARENT_A);
  const [parentB] = useState(DEFAULT_PARENT_B);

  // Current offspring — either AI-bred or default
  const offspring = mutatedGenome || breedResult?.child || {
    name: "QUANTUM_DOGE_V34",
    symbol: "QDOGE",
    narrative: culturalGenome.NARRATIVE,
    vibe: culturalGenome.VIBE,
    logoSeed: culturalGenome.LOGO_SEED,
  };

  const handleBreed = async () => {
    setBreeding(true);
    setBreedResult(null);
    setMutatedGenome(null);
    try {
      const result = await breedTokenCulture(parentA, parentB);
      setBreedResult(result);
    } catch (e) {
      console.error("Breeding error:", e);
    }
    setBreeding(false);
  };

  const handleMutate = async () => {
    setMutating(true);
    try {
      const source = breedResult?.child || offspring;
      const mutated = await mutateTokenCulture(source, 0.4);
      setMutatedGenome(mutated);
    } catch (e) {
      console.error("Mutation error:", e);
    }
    setMutating(false);
  };

  const geminiReady = isGeminiAvailable();

  // Cultural genome display data
  const displayGenome: Record<string, string> = {
    NAME: offspring.name,
    NARRATIVE: offspring.narrative,
    VIBE: offspring.vibe,
    LOGO_SEED: offspring.logoSeed,
  };

  return (
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-[1440px] px-6 pt-10 pb-12 relative"
    >
      {/* Ambient glowing background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-infrared/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
        <div className="h-[2px] w-8 bg-infrared" />
        <p className="mono-ink uppercase font-bold tracking-widest text-[11px] relative inline-block">
          <span className="bg-gradient-to-r from-ink via-graphite to-ink bg-clip-text text-transparent">/ EVOLUTION // DUAL-ENGINE BREEDING MONITOR</span>
        </p>
      </motion.div>

      {/* Breeding Controls */}
      <motion.div variants={itemVariants} className="mb-6 flex flex-wrap items-center gap-4">
        <button
          onClick={handleBreed}
          disabled={breeding || mutating}
          className="btn-primary flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {breeding ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> BREEDING VIA GEMMA 4...</>
          ) : (
            <><Dna className="w-4 h-4" /> AI CROSSOVER</>
          )}
        </button>
        <button
          onClick={handleMutate}
          disabled={breeding || mutating}
          className="btn-secondary flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {mutating ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> MUTATING...</>
          ) : (
            <><Zap className="w-4 h-4" /> MUTATE OFFSPRING</>
          )}
        </button>
        <div className="flex items-center gap-2 font-mono text-[10px] text-ink/50 uppercase tracking-widest">
          <div className={`w-2 h-2 rounded-full ${geminiReady ? 'bg-success-gold shadow-[0_0_8px_rgba(255,215,0,0.5)]' : 'bg-infrared'}`} />
          {geminiReady ? "GEMMA 4 31B-IT ONLINE" : "MOCK MODE (NO API KEY)"}
        </div>
      </motion.div>

      {/* Breeding Reasoning */}
      {breedResult?.reasoning && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mb-6 border border-aave-purple/20 bg-canvas/90 p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-aave-purple" />
            <span className="font-mono text-[10px] text-aave-purple uppercase tracking-widest font-bold">
              AI CROSSOVER REASONING // {breedResult.crossoverType}
            </span>
          </div>
          <p className="font-mono text-[11px] text-ink/70 leading-relaxed">{breedResult.reasoning}</p>
        </motion.div>
      )}

      <motion.div variants={itemVariants} className="mb-10 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/80 to-canvas backdrop-blur-md -z-10" />
        <div className="border border-ink/10 bg-canvas/40 shadow-[0_8px_32px_rgba(0,0,0,0.03)] p-8 relative transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-infrared/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="flex flex-col items-center justify-center gap-6 relative z-10">
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 font-mono text-[13px] md:text-[15px] uppercase tracking-[0.1em] text-graphite font-semibold">
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                className="flex items-center gap-3 border border-ink/10 px-5 py-3 bg-canvas/80 backdrop-blur-sm shadow-sm transition-all hover:border-ink/30 hover:shadow-md"
              >
                <span className="text-[10px] opacity-60">PARENT A //</span>
                <span className="text-ink font-bold drop-shadow-sm">{parentA.name}</span>
                <span className="text-graphite">(0.823)</span>
              </motion.div>
              
              <div className="text-infrared text-xl font-bold font-mono animate-pulse">×</div>
              
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                className="flex items-center gap-3 border border-ink/10 px-5 py-3 bg-canvas/80 backdrop-blur-sm shadow-sm transition-all hover:border-ink/30 hover:shadow-md"
              >
                <span className="text-[10px] opacity-60">PARENT B //</span>
                <span className="text-ink font-bold drop-shadow-sm">{parentB.name}</span>
                <span className="text-graphite">(0.831)</span>
              </motion.div>
            </div>

            <div className="h-[2px] w-20 bg-ink/10 rounded-full" />

            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 3, ease: "easeInOut" }}
              className="flex items-center gap-4 border-[2px] border-infrared/20 px-8 py-4 bg-canvas/90 backdrop-blur-md shadow-[0_0_25px_rgba(255,0,0,0.08)] relative overflow-hidden group-hover:border-infrared/40 transition-colors duration-500"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-infrared" />
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] opacity-60">OFFSPRING //</span>
              <span className="font-mono font-bold text-[18px] uppercase tracking-[0.12em] bg-gradient-to-r from-ink via-infrared to-ink bg-clip-text text-transparent drop-shadow-sm" style={{ WebkitBackgroundClip: 'text' }}>
                {breeding ? "BREEDING..." : offspring.name}
              </span>
              <span className="font-mono text-infrared font-bold text-[18px]">(0.847)</span>
            </motion.div>
          </div>

          {/* Enhanced Brutalist accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-[3px] border-l-[3px] border-ink/20 transition-all duration-300 group-hover:border-infrared group-hover:scale-110 group-hover:-translate-x-1 group-hover:-translate-y-1" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-[3px] border-r-[3px] border-ink/20 transition-all duration-300 group-hover:border-infrared group-hover:scale-110 group-hover:translate-x-1 group-hover:-translate-y-1" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-[3px] border-l-[3px] border-ink/20 transition-all duration-300 group-hover:border-infrared group-hover:scale-110 group-hover:-translate-x-1 group-hover:translate-y-1" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[3px] border-r-[3px] border-ink/20 transition-all duration-300 group-hover:border-infrared group-hover:scale-110 group-hover:translate-x-1 group-hover:translate-y-1" />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={itemVariants} className="h-full">
          <VaultCard label="ECONOMIC ENGINE // CMA-ES">
            <div className="flex justify-between items-start gap-4 mb-6 relative z-10">
              <p className="text-[13px] text-ink/70 leading-relaxed max-w-[85%] font-medium">Parameter genome optimized via covariance matrix adaptation. Evolving hyper-parameters for simulated trading swarms.</p>
              <AgentBadge>ENGINE: CMA-ES</AgentBadge>
            </div>
            
            <div className="font-mono text-[11.5px] uppercase tracking-[0.1em] space-y-[4px] mb-8 mt-auto relative z-10">
              {cmaParams.map((p) => (
                <div key={p.key} className="flex justify-between items-center bg-ink/[0.03] hover:bg-ink/[0.06] border border-transparent hover:border-ink/10 px-4 py-2.5 transition-all duration-300">
                  <span className="text-graphite">{p.key}</span>
                  <span className="text-ink font-bold">{p.value}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-5 border-t border-ink/10 relative z-10">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1.5 h-1.5 rounded-full bg-infrared animate-pulse shadow-[0_0_8px_rgba(255,0,0,0.5)]" />
                <p className="mono font-semibold">COVARIANCE MATRIX // LIVE</p>
              </div>
              <div className="group-hover:shadow-[0_0_20px_rgba(255,0,0,0.06)] transition-all duration-500 overflow-hidden border border-ink/5 bg-canvas">
                 <CovarianceMatrix />
              </div>
              <div className="mt-6">
                <LinearPacer value={0.412} label="STEP SIZE σ" weight="0.412" />
              </div>
            </div>
          </VaultCard>
        </motion.div>

        <motion.div variants={itemVariants} className="h-full">
          <VaultCard label="CULTURAL ENGINE // GEMMA 4 + SLERP" accentColor="aave-purple">
            <div className="flex justify-between items-start gap-4 mb-6 relative z-10">
              <p className="text-[13px] text-ink/70 leading-relaxed max-w-[85%] font-medium">Semantic genome interpolated via spherical-linear blend of parent embeddings. Powered by Gemma 4 31B-IT via Google AI Studio.</p>
              <AgentBadge>ENGINE: GEMMA-4</AgentBadge>
            </div>
            
            <div className="font-mono text-[11.5px] uppercase tracking-[0.1em] space-y-[4px] mb-8 mt-auto relative z-10">
              {Object.entries(displayGenome).map(([k, v]) => (
                <div key={k} className="flex justify-between items-center gap-4 bg-ink/[0.03] hover:bg-ink/[0.06] border border-transparent hover:border-ink/10 px-4 py-2.5 transition-all duration-300">
                  <span className="text-graphite shrink-0">{k}</span>
                  <span className="text-ink font-bold text-right truncate">{v as string}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-5 border-t border-ink/10 relative z-10">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1.5 h-1.5 rounded-full bg-infrared animate-pulse shadow-[0_0_8px_rgba(255,0,0,0.5)] bg-aave-purple shadow-[0_0_8px_rgba(186,85,211,0.5)]" style={{ backgroundColor: 'var(--aave-purple)' }} />
                <p className="mono font-semibold">SLERP GEODESIC // T = 0.5</p>
              </div>
              <div className="group-hover:shadow-[0_0_20px_rgba(186,85,211,0.06)] transition-all duration-500 overflow-hidden border border-ink/5 p-5 bg-canvas">
                 <SlerpArc />
              </div>
            </div>
          </VaultCard>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-2">
          <VaultCard label="PHYLOGENETIC TREE // LINEAGE GEN_00 → GEN_34">
            <div className="relative z-10 pt-6">
              <PhylogeneticTree />
            </div>
          </VaultCard>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Evolution;
