import { ScrambleText } from "@/components/ScrambleText";
import { VaultCard } from "@/components/VaultCard";
import { LinearPacer } from "@/components/LinearPacer";
import { FitnessHeatmap } from "@/visualizations/FitnessHeatmap";
import { FitnessTrajectory } from "@/visualizations/FitnessTrajectory";
import { fitnessSignals } from "@/data/mockData";

const Fitness = () => (
  <section className="mx-auto max-w-[1440px] px-6 pt-10 pb-12">
    <p className="mono mb-3">/ FITNESS // MULTI-SIGNAL EVALUATION</p>

    <div className="my-10">
      <h2 className="display-hero">
        <ScrambleText value="0.847" />
      </h2>
      <p className="mono mt-4">HYBRID FITNESS SCORE // GENERATION 34</p>
    </div>

    <VaultCard label="FORMULA">
      <p className="font-mono text-[12px] md:text-[14px] uppercase tracking-[0.08em] text-ink text-center leading-relaxed break-words">
        F(token) = <span className="text-infrared">w₁</span>·ΔHolders + <span className="text-infrared">w₂</span>·TemporalVelocity + <span className="text-infrared">w₃</span>·Volume + <span className="text-infrared">w₄</span>·LiquidityDepth + <span className="text-infrared">w₅</span>·SocialSpread
      </p>
    </VaultCard>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
      <div className="lg:col-span-6">
        <VaultCard label="SIGNAL BREAKDOWN">
          <div className="space-y-5">
            {fitnessSignals.map((s, i) => (
              <LinearPacer key={s.key} value={s.value} label={s.key} weight={`w${["₁","₂","₃","₄","₅"][i]} = ${s.weight.toFixed(2)}`} />
            ))}
          </div>
        </VaultCard>
      </div>
      <div className="lg:col-span-6">
        <VaultCard label="GENERATION FITNESS TRAJECTORY">
          <FitnessTrajectory />
          <p className="mono mt-2">DASHED LINE = TARGET 0.900</p>
        </VaultCard>
      </div>
      <div className="lg:col-span-12">
        <VaultCard label="POPULATION HEATMAP // 32 TOKENS × 5 SIGNALS">
          <FitnessHeatmap />
        </VaultCard>
      </div>
    </div>
  </section>
);

export default Fitness;
