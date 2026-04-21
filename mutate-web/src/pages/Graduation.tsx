import { useState } from "react";
import { VaultCard } from "@/components/VaultCard";
import { ScrambleText } from "@/components/ScrambleText";
import { ArrowRight } from "lucide-react";

const STEPS = [
  "Engine Evaluation",
  "Dashboard Alert",
  "Human Approval",
  "Four.Meme Login",
  "create-instant",
  "8004-register",
  "BNB Chain LIVE",
];

const Graduation = () => {
  const [graduated, setGraduated] = useState(false);
  const [progress, setProgress] = useState(2); // current step index, complete = < progress
  const [deploying, setDeploying] = useState(false);
  const [sweep, setSweep] = useState(false);

  const approve = () => {
    setDeploying(true);
    let i = progress;
    const tick = () => {
      i += 1;
      setProgress(i);
      if (i < STEPS.length) setTimeout(tick, 450);
      else {
        setSweep(true);
        setTimeout(() => setSweep(false), 900);
      }
    };
    tick();
  };

  return (
    <section className="mx-auto max-w-[1440px] px-6 pt-10 pb-16 relative overflow-hidden">
      {sweep && <div className="pointer-events-none absolute left-0 right-0 top-0 h-[3px] bg-infrared infrared-sweep z-20" />}

      <p className="mono mb-3">/ GRADUATION // MAINNET DEPLOYMENT CONTROL</p>

      {/* Status panel */}
      <VaultCard className="mb-10">
        {!graduated ? (
          <div className="text-center py-6">
            <p className="mono mb-3">STATUS: EVOLVING</p>
            <div className="display text-[clamp(2rem,6vw,5rem)]">BEST FITNESS 0.847 / TARGET 0.900</div>
            <p className="mono mt-4">ESTIMATED GENERATIONS REMAINING: ~12</p>
            <button onClick={() => setGraduated(true)} className="btn-secondary mt-6">SIMULATE THRESHOLD REACHED</button>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="font-mono uppercase tracking-[0.1em] text-infrared text-[14px] mb-3 flash-dot">🚨 GRADUATION ALERT</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="border border-ink p-5">
                <p className="mono mb-1">TOKEN</p>
                <div className="font-display font-bold uppercase text-[28px]">
                  <ScrambleText value="QUANTUM_DOGE_V47" />
                </div>
                <p className="mono mt-3">FITNESS</p>
                <div className="display text-[40px]">0.912</div>
              </div>
              <div className="border border-ink p-5 font-mono text-[12px] uppercase tracking-[0.08em] space-y-2">
                <div className="flex justify-between border-b border-ink/10 pb-1"><span className="text-graphite">GENERATION</span><span>47</span></div>
                <div className="flex justify-between border-b border-ink/10 pb-1"><span className="text-graphite">HOLDER GROWTH</span><span>+289%</span></div>
                <div className="flex justify-between border-b border-ink/10 pb-1"><span className="text-graphite">VOLUME</span><span>1.2M SIM</span></div>
                <div className="flex justify-between"><span className="text-graphite">CHAIN</span><span>BNB MAINNET</span></div>
              </div>
            </div>
          </div>
        )}
      </VaultCard>

      {/* Pipeline */}
      <VaultCard label="DEPLOYMENT PIPELINE" className="mb-10">
        <div className="overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max py-2">
            {STEPS.map((s, i) => {
              const done = i < progress;
              const current = i === progress;
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
                    {progress >= STEPS.length && i === STEPS.length - 1 ? "✅ LIVE ON BNB CHAIN" : s}
                  </div>
                  {i < STEPS.length - 1 && <ArrowRight className="h-4 w-4 mx-1 text-ink/60" />}
                </div>
              );
            })}
          </div>
        </div>
      </VaultCard>

      {/* Action area */}
      <div className="grid grid-cols-12 gap-6 items-center">
        <div className="col-span-12 md:col-span-6 md:col-start-1">
          <button
            onClick={approve}
            disabled={!graduated || deploying}
            className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
          >
            APPROVE DEPLOYMENT →
          </button>
        </div>
        <div className="col-span-12 md:col-span-6 text-right">
          <button className="btn-secondary">REJECT — CONTINUE EVOLUTION →</button>
        </div>
      </div>
    </section>
  );
};

export default Graduation;
