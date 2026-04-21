import { useEffect, useState, useRef } from "react";
import { auditEvents } from "@/data/mockData";
import { Terminal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const AuditLog = () => {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<string[]>(() => auditEvents.slice(0, 4));
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      setLines((prev) => {
        const next = auditEvents[Math.floor(Math.random() * auditEvents.length)];
        const stamp = new Date().toISOString().slice(11, 19);
        const hash = "0x" + Math.floor(Math.random() * 0xfffff).toString(16).toUpperCase().padStart(5, "0");
        return [...prev.slice(-40), `[${stamp}] > ${next} // ${hash}`];
      });
    }, 1800);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (open && logRef.current) {
        logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [lines, open]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-[400px] h-[300px] bg-canvas/95 backdrop-blur-xl border-2 border-ink/20 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden relative"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-infrared animate-pulse" />
            <div className="flex items-center justify-between px-4 py-3 border-b border-ink/10 bg-ink/5">
              <span className="font-mono text-[10px] text-ink/60 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-infrared rounded-full" />
                NETWORK / AUDIT LOG
              </span>
              <button onClick={() => setOpen(false)} className="text-ink/40 hover:text-ink transition-colors">
                 <X className="w-3 h-3" />
              </button>
            </div>
            <div ref={logRef} className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-[10px] uppercase text-ink/70">
              {lines.map((l, i) => (
                 <div key={i} className="flex gap-2">
                   <span className="text-ink/30">{">"}</span>
                   <span className={i === lines.length - 1 ? "text-infrared font-bold" : ""}>{l}</span>
                 </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        className="w-12 h-12 bg-canvas border border-ink/20 flex items-center justify-center hover:bg-ink/5 hover:border-ink/40 transition-all group relative shadow-lg"
        aria-label="Toggle audit log"
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-infrared opacity-0 group-hover:opacity-100 transition-opacity" />
        <Terminal className="w-5 h-5 text-ink/60 group-hover:text-ink transition-colors" />
      </button>
    </div>
  );
};
