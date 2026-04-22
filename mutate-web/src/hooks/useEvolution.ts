/**
 * useEvolution — React hook that orchestrates a full AI-driven evolution cycle.
 * 
 * Runs the complete M.U.T.A.T.E. pipeline:
 * 1. Seed initial population (AI-generated token genomes)
 * 2. Simulate swarm trading for each token
 * 3. Evaluate fitness (cultural + economic)
 * 4. Select top performers
 * 5. Breed + mutate → next generation
 * 6. Repeat until target fitness or max generations
 */

import { useState, useCallback, useRef } from "react";
import {
  generateTokenGenome,
  breedTokenCulture,
  mutateTokenCulture,
  evaluateCulturalFitness,
  type CulturalGenome,
  type FitnessEvaluation,
} from "@/lib/tokenBreeder";
import {
  generateSwarmSentiment,
  type SwarmSentiment,
  type MarketState,
} from "@/lib/swarmAI";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface TokenCandidate {
  genome: CulturalGenome;
  fitness: number;
  culturalFitness: FitnessEvaluation | null;
  swarmSentiment: SwarmSentiment | null;
  generation: number;
  parentA?: string;
  parentB?: string;
}

export interface EvolutionState {
  /** Current generation number (1-based) */
  generation: number;
  /** All tokens in current population */
  population: TokenCandidate[];
  /** Best token across all generations */
  bestToken: TokenCandidate | null;
  /** Best fitness score ever achieved */
  bestFitness: number;
  /** Whether evolution is currently running */
  isEvolving: boolean;
  /** Current phase description */
  phase: string;
  /** Audit log entries */
  logs: string[];
  /** Whether evolution is complete */
  completed: boolean;
  /** Error, if any */
  error: string | null;
}

export interface EvolutionConfig {
  /** Number of generations to run */
  maxGenerations: number;
  /** Number of tokens per generation */
  populationSize: number;
  /** Target fitness score to stop early */
  targetFitness: number;
  /** Mutation strength (0.0 — 1.0) */
  mutationRate: number;
  /** How many top tokens survive each generation (selection pressure) */
  eliteCount: number;
}

const DEFAULT_CONFIG: EvolutionConfig = {
  maxGenerations: 5,
  populationSize: 6,
  targetFitness: 0.9,
  mutationRate: 0.3,
  eliteCount: 3,
};

// ─── Hook ───────────────────────────────────────────────────────────────────

export function useEvolution(config: Partial<EvolutionConfig> = {}) {
  const cfg = { ...DEFAULT_CONFIG, ...config };

  const [state, setState] = useState<EvolutionState>({
    generation: 0,
    population: [],
    bestToken: null,
    bestFitness: 0,
    isEvolving: false,
    phase: "IDLE",
    logs: [],
    completed: false,
    error: null,
  });

  const abortRef = useRef(false);

  const log = useCallback((entry: string) => {
    const timestamp = Date.now().toString().slice(-6);
    const msg = `${entry} // T:${timestamp}`;
    setState((s) => ({ ...s, logs: [msg, ...s.logs].slice(0, 50) }));
  }, []);

  const setPhase = useCallback((phase: string) => {
    setState((s) => ({ ...s, phase }));
  }, []);

  // ─── Simulate Market State ──────────────────────────────────────────────

  function simulateMarket(gen: number, tokenIndex: number): MarketState {
    const basePrice = 0.004 + Math.sin(gen / 3) * 0.001;
    return {
      price: basePrice + (Math.random() - 0.5) * 0.001,
      volume24h: 50000 + Math.random() * 200000,
      priceChange: (Math.random() - 0.4) * 30,
      holderCount: 100 + gen * 50 + Math.floor(Math.random() * 200),
      liquidityDepth: 10000 + Math.random() * 40000,
    };
  }

  // ─── Evolution Loop ─────────────────────────────────────────────────────

  const startEvolution = useCallback(async () => {
    abortRef.current = false;
    setState((s) => ({
      ...s,
      isEvolving: true,
      completed: false,
      error: null,
      generation: 0,
      population: [],
      bestToken: null,
      bestFitness: 0,
      logs: [],
      phase: "INITIALIZING",
    }));

    try {
      // ── Phase 1: Seed Population ─────────────────────────────────────
      log("EVOLUTION ENGINE STARTING");
      log(`CONFIG: POP=${cfg.populationSize} GEN=${cfg.maxGenerations} TARGET=${cfg.targetFitness}`);
      setPhase("SEEDING POPULATION");

      const themes = [
        "quantum physics meets dogs",
        "retro gaming meets crypto",
        "space exploration meets memes",
        "AI consciousness meets animals",
        "ancient mythology meets DeFi",
        "cyberpunk meets wholesome animals",
      ];

      const seedGenomes = await Promise.all(
        Array.from({ length: cfg.populationSize }, (_, i) =>
          generateTokenGenome(themes[i % themes.length])
        )
      );

      let population: TokenCandidate[] = seedGenomes.map((genome) => ({
        genome,
        fitness: 0,
        culturalFitness: null,
        swarmSentiment: null,
        generation: 0,
      }));

      log(`SEEDED ${population.length} INITIAL GENOMES`);

      // ── Phase 2: Evolution Loop ──────────────────────────────────────
      for (let gen = 1; gen <= cfg.maxGenerations; gen++) {
        if (abortRef.current) {
          log("EVOLUTION ABORTED BY OPERATOR");
          break;
        }

        setState((s) => ({ ...s, generation: gen }));
        log(`── GENERATION ${gen}/${cfg.maxGenerations} ──`);

        // ─ Evaluate Fitness ────────────────────────────────────────────
        setPhase(`GEN ${gen}: EVALUATING FITNESS`);
        log("CULTURAL FITNESS EVALUATION // GEMMA 4 31B-IT");

        const evaluations = await Promise.all(
          population.map((t) => evaluateCulturalFitness(t.genome))
        );

        population = population.map((t, i) => ({
          ...t,
          culturalFitness: evaluations[i],
          fitness: evaluations[i].overallScore,
          generation: gen,
        }));

        // ─ Swarm Simulation ────────────────────────────────────────────
        setPhase(`GEN ${gen}: SWARM SIMULATION`);
        log(`AGENT SWARM TICK // ${15247} TRADING POSITIONS`);

        const swarmResults = await Promise.all(
          population.map((t, i) =>
            generateSwarmSentiment(t.genome, simulateMarket(gen, i))
          )
        );

        population = population.map((t, i) => {
          // Blend swarm sentiment into fitness
          const swarm = swarmResults[i];
          const swarmBonus = swarm.buyPressure * 0.15 - swarm.sellPressure * 0.1 + swarm.narrativeSpread * 0.05;
          return {
            ...t,
            swarmSentiment: swarm,
            fitness: Math.min(1, Math.max(0, t.fitness + swarmBonus)),
          };
        });

        log(`SWARM BIAS: ${swarmResults.map((s) => s.overallBias).join(" | ")}`);

        // ─ Sort by fitness ─────────────────────────────────────────────
        population.sort((a, b) => b.fitness - a.fitness);

        const best = population[0];
        log(`BEST TOKEN: ${best.genome.name} // FITNESS: ${best.fitness.toFixed(3)}`);

        setState((s) => ({
          ...s,
          population: [...population],
          bestToken: best.fitness > s.bestFitness ? best : s.bestToken,
          bestFitness: Math.max(s.bestFitness, best.fitness),
        }));

        // ─ Check Target ────────────────────────────────────────────────
        if (best.fitness >= cfg.targetFitness) {
          log(`🚨 TARGET FITNESS REACHED: ${best.fitness.toFixed(3)} ≥ ${cfg.targetFitness}`);
          log(`GRADUATING TOKEN: ${best.genome.name}`);
          setState((s) => ({ ...s, completed: true, phase: "GRADUATED" }));
          break;
        }

        if (gen === cfg.maxGenerations) {
          log("MAX GENERATIONS REACHED");
          setState((s) => ({ ...s, completed: true, phase: "MAX GENERATIONS" }));
          break;
        }

        // ─ Selection & Breeding ────────────────────────────────────────
        setPhase(`GEN ${gen}: BREEDING`);
        const elites = population.slice(0, cfg.eliteCount);
        log(`SELECTED ${elites.length} ELITES FOR BREEDING`);

        const offspring: TokenCandidate[] = [];

        // Keep elites
        for (const elite of elites) {
          offspring.push({ ...elite, generation: gen + 1 });
        }

        // Breed new tokens to fill population
        while (offspring.length < cfg.populationSize) {
          const parentA = elites[Math.floor(Math.random() * elites.length)];
          const parentB = elites[Math.floor(Math.random() * elites.length)];

          const result = await breedTokenCulture(parentA.genome, parentB.genome);
          log(`SLERP CROSSOVER // ${parentA.genome.name} × ${parentB.genome.name} → ${result.child.name}`);

          // Apply mutation
          const mutated = await mutateTokenCulture(result.child, cfg.mutationRate);
          log(`MUTATION APPLIED // σ=${cfg.mutationRate.toFixed(2)}`);

          offspring.push({
            genome: mutated,
            fitness: 0,
            culturalFitness: null,
            swarmSentiment: null,
            generation: gen + 1,
            parentA: parentA.genome.name,
            parentB: parentB.genome.name,
          });
        }

        population = offspring;
      }
    } catch (err: any) {
      console.error("[M.U.T.A.T.E.] Evolution error:", err);
      log(`ERROR: ${err.message || "Unknown error"}`);
      setState((s) => ({ ...s, error: err.message || "Evolution failed" }));
    } finally {
      setState((s) => ({ ...s, isEvolving: false }));
    }
  }, [cfg, log, setPhase]);

  const stopEvolution = useCallback(() => {
    abortRef.current = true;
    log("ABORT REQUESTED");
  }, [log]);

  const reset = useCallback(() => {
    abortRef.current = true;
    setState({
      generation: 0,
      population: [],
      bestToken: null,
      bestFitness: 0,
      isEvolving: false,
      phase: "IDLE",
      logs: [],
      completed: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    startEvolution,
    stopEvolution,
    reset,
    config: cfg,
  };
}
