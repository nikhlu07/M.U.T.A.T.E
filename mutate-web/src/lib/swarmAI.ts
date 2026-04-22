/**
 * Swarm AI — Agent Decision Simulation
 * Uses Gemma 4 31B to simulate trading decisions for different agent archetypes.
 * 
 * Strategy: Rather than calling Gemini 15,000 times per generation,
 * we sample 6 representative agents (one per archetype) and interpolate
 * results across the population using behavioral dimension vectors.
 */

import { generateJSON } from "./gemini";
import type { CulturalGenome } from "./tokenBreeder";

// ─── Types ──────────────────────────────────────────────────────────────────

export type AgentArchetype =
  | "MOMENTUM_TRADER"
  | "DIAMOND_HANDS"
  | "SPECULATOR"
  | "HERD_FOLLOWER"
  | "WHALE"
  | "INFLUENCER";

export interface AgentDecision {
  action: "BUY" | "SELL" | "HOLD";
  conviction: number; // 0.0 — 1.0
  size: number; // position size as fraction of portfolio 0.0 — 1.0
  reasoning: string;
}

export interface SwarmSentiment {
  overallBias: "BULLISH" | "BEARISH" | "NEUTRAL";
  buyPressure: number; // 0.0 — 1.0
  holdStrength: number; // 0.0 — 1.0
  sellPressure: number; // 0.0 — 1.0
  narrativeSpread: number; // 0.0 — 1.0 (how "infectious" the token's culture is)
  archetypeDecisions: Record<AgentArchetype, AgentDecision>;
}

export interface MarketState {
  price: number;
  volume24h: number;
  priceChange: number; // percentage
  holderCount: number;
  liquidityDepth: number;
}

// ─── Agent Personality Prompts ──────────────────────────────────────────────

const ARCHETYPE_PERSONAS: Record<AgentArchetype, string> = {
  MOMENTUM_TRADER:
    "You are a MOMENTUM TRADER. You follow trends aggressively, buy into pumps, and sell at the first sign of reversal. FOMO drives you. You have high turnover and chase volume.",
  DIAMOND_HANDS:
    "You are a DIAMOND HANDS holder. You believe in long-term value. You have extreme loss aversion and almost never sell. You're a community builder who values narrative over price.",
  SPECULATOR:
    "You are a SPECULATOR / DEGEN. You love high-risk, high-reward plays. You're narrative-driven and will ape into anything with a good meme. Quick flip strategy, in and out.",
  HERD_FOLLOWER:
    "You are a HERD FOLLOWER. You copy what others are doing. Social proof is everything. You're a late adopter who buys when everyone else is buying and panics when others sell.",
  WHALE:
    "You are a WHALE. You have large capital and your trades move markets. You accumulate strategically, often buying dips. You think in terms of market impact and liquidity.",
  INFLUENCER:
    "You are an INFLUENCER. You amplify narratives and create social signals. You buy tokens that have good meme potential and then shill them. Community catalysts.",
};

// ─── System Prompt ──────────────────────────────────────────────────────────

const SWARM_SYSTEM = `You are a simulated AI trading agent within the M.U.T.A.T.E. synthetic market.
You must role-play your assigned archetype personality and make a trading decision.
Be consistent with your archetype's risk profile and behavioral tendencies.
Always respond in valid JSON only.`;

// ─── Mock Data ──────────────────────────────────────────────────────────────

function mockDecision(archetype: AgentArchetype): AgentDecision {
  const biases: Record<AgentArchetype, { buyProb: number; holdProb: number }> = {
    MOMENTUM_TRADER: { buyProb: 0.6, holdProb: 0.2 },
    DIAMOND_HANDS: { buyProb: 0.3, holdProb: 0.6 },
    SPECULATOR: { buyProb: 0.7, holdProb: 0.1 },
    HERD_FOLLOWER: { buyProb: 0.4, holdProb: 0.4 },
    WHALE: { buyProb: 0.35, holdProb: 0.45 },
    INFLUENCER: { buyProb: 0.5, holdProb: 0.3 },
  };

  const { buyProb, holdProb } = biases[archetype];
  const r = Math.random();
  const action = r < buyProb ? "BUY" : r < buyProb + holdProb ? "HOLD" : "SELL";

  return {
    action,
    conviction: 0.4 + Math.random() * 0.5,
    size: 0.1 + Math.random() * 0.4,
    reasoning: `[MOCK] ${archetype} decided to ${action} based on simulated behavioral profile.`,
  };
}

// ─── Public API ─────────────────────────────────────────────────────────────

/**
 * Simulate a single agent's trading decision for a token.
 */
export async function simulateAgentDecision(
  archetype: AgentArchetype,
  token: CulturalGenome,
  market: MarketState
): Promise<AgentDecision> {
  const persona = ARCHETYPE_PERSONAS[archetype];

  const prompt = `${persona}

You are evaluating this memecoin in the M.U.T.A.T.E. synthetic market:

TOKEN:
- Name: ${token.name} ($${token.symbol})
- Narrative: "${token.narrative}"
- Vibe: ${token.vibe}

MARKET STATE:
- Current Price: $${market.price.toFixed(6)}
- 24h Volume: $${market.volume24h.toLocaleString()}
- Price Change: ${market.priceChange > 0 ? "+" : ""}${market.priceChange.toFixed(1)}%
- Holder Count: ${market.holderCount.toLocaleString()}
- Liquidity Depth: $${market.liquidityDepth.toLocaleString()}

Make your trading decision based on your archetype personality.

Respond with JSON: { "action": "BUY"|"SELL"|"HOLD", "conviction": number (0-1), "size": number (0-1), "reasoning": string (1 sentence max) }`;

  return generateJSON<AgentDecision>(prompt, mockDecision(archetype), {
    systemInstruction: SWARM_SYSTEM,
    temperature: 0.85,
  });
}

/**
 * Generate full swarm sentiment by sampling all 6 archetypes.
 * This is the core function called once per generation — not 15K times.
 */
export async function generateSwarmSentiment(
  token: CulturalGenome,
  market: MarketState
): Promise<SwarmSentiment> {
  const archetypes: AgentArchetype[] = [
    "MOMENTUM_TRADER",
    "DIAMOND_HANDS",
    "SPECULATOR",
    "HERD_FOLLOWER",
    "WHALE",
    "INFLUENCER",
  ];

  // Run all 6 archetypes in parallel
  const decisions = await Promise.all(
    archetypes.map((a) => simulateAgentDecision(a, token, market))
  );

  // Aggregate decisions into a map
  const archetypeDecisions: Record<AgentArchetype, AgentDecision> = {} as any;
  archetypes.forEach((a, i) => {
    archetypeDecisions[a] = decisions[i];
  });

  // Weighted population distribution
  const weights: Record<AgentArchetype, number> = {
    MOMENTUM_TRADER: 3200,
    DIAMOND_HANDS: 2800,
    SPECULATOR: 4100,
    HERD_FOLLOWER: 2400,
    WHALE: 847,
    INFLUENCER: 1900,
  };
  const totalPop = Object.values(weights).reduce((s, w) => s + w, 0);

  // Compute aggregate sentiment
  let buyPressure = 0;
  let holdStrength = 0;
  let sellPressure = 0;
  let narrativeSpread = 0;

  archetypes.forEach((a) => {
    const d = archetypeDecisions[a];
    const w = weights[a] / totalPop;

    if (d.action === "BUY") buyPressure += w * d.conviction;
    else if (d.action === "HOLD") holdStrength += w * d.conviction;
    else sellPressure += w * d.conviction;

    // Narrative spread: influenced by influencers, speculators, and herd followers
    if (a === "INFLUENCER" || a === "SPECULATOR" || a === "HERD_FOLLOWER") {
      narrativeSpread += w * d.conviction;
    }
  });

  // Normalize narrative spread
  narrativeSpread = Math.min(1, narrativeSpread * 2);

  const overallBias: SwarmSentiment["overallBias"] =
    buyPressure > sellPressure + 0.1
      ? "BULLISH"
      : sellPressure > buyPressure + 0.1
        ? "BEARISH"
        : "NEUTRAL";

  return {
    overallBias,
    buyPressure: +buyPressure.toFixed(3),
    holdStrength: +holdStrength.toFixed(3),
    sellPressure: +sellPressure.toFixed(3),
    narrativeSpread: +narrativeSpread.toFixed(3),
    archetypeDecisions,
  };
}
