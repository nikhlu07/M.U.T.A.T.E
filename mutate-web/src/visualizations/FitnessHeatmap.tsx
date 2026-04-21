import { useState, useEffect } from "react";
import { tokenHeatmap, fitnessSignals } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";

export const FitnessHeatmap = () => {
  const [activeNodes, setActiveNodes] = useState<{r: number, c: number}[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [glitchText] = useState("SWARM BATCH EVALUATION MATRIX");

  useEffect(() => {
    const int = setInterval(() => {
      // randomly highlight some evaluation nodes
      const nodes = Array.from({length: Math.floor(Math.random() * 5) + 3}, () => ({
        r: Math.floor(Math.random() * tokenHeatmap.length),
        c: Math.floor(Math.random() * fitnessSignals.length),
      }));
      setActiveNodes(nodes);

      if (Math.random() > 0.6) {
        const mutations = ["CALC // HOLDERS", "EVAL // TEMPORAL DYN", "TENSOR SYNTHESIS", "RE-WEIGHT ALIAS", "SIG: VOLUME DEPTH"];
        setLogs(prev => {
          const l = [mutations[Math.floor(Math.random() * mutations.length)] + ` // ${Date.now().toString().slice(-6)}`, ...prev];
          return l.slice(0, 4);
        });
      }
    }, 400); // Slower interval for smoother animations
    return () => clearInterval(int);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full flex flex-col p-6 relative overflow-hidden backdrop-blur-xl bg-canvas/60 border border-ink/10 shadow-[0_8px_32px_rgba(0,0,0,0.05)] group"
    >
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-infrared/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Header */}
      <div className="mono-ink font-bold border-b border-ink/20 pb-2 mb-6 uppercase text-[10px] flex justify-between items-center tracking-widest relative z-10">
         <span className="bg-gradient-to-r from-ink via-graphite to-ink bg-clip-text text-transparent animate-pulse drop-shadow-sm">
           LIVE // {glitchText}
         </span>
         <span className="text-infrared font-bold flex items-center gap-[6px]">
            <span className="w-[6px] h-[6px] rounded-full bg-infrared shadow-[0_0_8px_rgba(255,0,0,0.6)] animate-ping" />
            <span className="flash-dot mt-[1px]">REC</span>
         </span>
      </div>

      {/* Main Grid */}
      <div className="flex gap-4 relative z-10">
        {/* Token List (Y-axis) */}
        <div className="flex flex-col gap-[4px] pt-[22px] w-12 shrink-0 border-r border-ink/10 pr-3">
          {tokenHeatmap.map((row, ri) => (
             <motion.div 
               whileHover={{ x: 2, color: "var(--vantablack)" }}
               key={ri} 
               className="text-[9px] font-mono text-graphite h-4 flex items-center justify-end leading-none cursor-default transition-colors duration-200"
             >
               {row[0].token.replace('T_', '')}
             </motion.div>
          ))}
        </div>

        {/* Heatmap Matrix Area */}
        <div className="flex-1 pb-4">
           {/* Signals Headers (X-axis) */}
           <div className="grid grid-cols-5 gap-[4px] mb-3 h-4 mt-1">
              {fitnessSignals.map((s, i) => (
                <div key={i} className="text-[9px] font-mono font-bold text-ink/70 text-center tracking-widest uppercase">
                  {s.key.substring(0, 4)}
                </div>
              ))}
           </div>
           
           {/* Grid Body */}
           <div className="flex flex-col gap-[4px]">
             {tokenHeatmap.map((row, ri) => (
               <div key={ri} className="grid grid-cols-5 gap-[4px] h-4">
                 {row.map((cell, ci) => {
                   const isActive = activeNodes.some(n => n.r === ri && n.c === ci);
                   
                   // Modern glow coloring based on value
                   let baseColor = "bg-ink/5";
                   if (cell.value > 0.85) baseColor = "bg-infrared";
                   else if (cell.value > 0.6) baseColor = "bg-infrared/70";
                   else if (cell.value > 0.4) baseColor = "bg-infrared/40";
                   else if (cell.value > 0.2) baseColor = "bg-graphite/20";
                   
                   return (
                     <motion.div 
                       key={ci} 
                       title={`${cell.signal}: ${cell.value.toFixed(2)}`}
                       animate={{
                         scale: isActive ? 1.08 : 1,
                         zIndex: isActive ? 50 : 1,
                       }}
                       transition={{ type: "spring", stiffness: 300, damping: 20 }}
                       className={`w-full h-full border ${baseColor} ${
                          isActive 
                            ? 'border-infrared shadow-[0_0_12px_rgba(255,0,0,0.5)]' 
                            : 'border-ink/10 hover:border-ink/30'
                       }`}
                     />
                   )
                 })}
               </div>
             ))}
           </div>
        </div>
      </div>

      {/* Footer Logs */}
      <div className="h-[48px] mt-3 border-t border-ink/10 pt-2 relative z-10 w-full overflow-hidden">
        {/* Soft fading gradient to hide overflowing text */}
        <div className="absolute bottom-0 left-0 w-full h-[12px] bg-gradient-to-t from-canvas to-transparent pointer-events-none z-20" />
        <div className="font-mono text-[9px] text-graphite flex flex-col gap-[2px] tracking-wider uppercase relative">
          <AnimatePresence>
            {logs.map((log, i) => (
              <motion.div 
                key={log} 
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                className={i === 0 ? "text-ink font-bold drop-shadow-sm" : "opacity-40"}
              >
                {'> ' + log}
              </motion.div>
            ))}
          </AnimatePresence>
          {logs.length === 0 && <div className="text-graphite/40">{'> AWAITING TELEMETRY...'}</div>}
        </div>
      </div>

      {/* Enhanced Brutalist accents (Glow corners) */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-[2px] border-l-[2px] border-ink shadow-[0_0_8px_rgba(0,0,0,0.08)] transition-all duration-300 group-hover:border-infrared group-hover:scale-110 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-[2px] border-r-[2px] border-ink shadow-[0_0_8px_rgba(0,0,0,0.08)] transition-all duration-300 group-hover:border-infrared group-hover:scale-110 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-[2px] border-l-[2px] border-ink shadow-[0_0_8px_rgba(0,0,0,0.08)] transition-all duration-300 group-hover:border-infrared group-hover:scale-110 group-hover:-translate-x-0.5 group-hover:translate-y-0.5" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[2px] border-r-[2px] border-ink shadow-[0_0_8px_rgba(0,0,0,0.08)] transition-all duration-300 group-hover:border-infrared group-hover:scale-110 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
    </motion.div>
  );
};
