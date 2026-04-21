// Deterministic-ish mock data for M.U.T.A.T.E.

export const heroData = {
  activeAgents: 15247,
  generation: { current: 34, total: 50 },
  bestFitness: 0.847,
  targetFitness: 0.9,
  populationSize: 128,
  topPerformer: {
    name: "QUANTUM_DOGE_V34",
    fitness: 0.847,
    holderGrowth: [12, 34, 28, 56, 89, 124, 167, 201, 245, 289],
  },
  agentBreakdown: {
    momentumTraders: 3200,
    diamondHands: 2800,
    speculators: 4100,
    herdFollowers: 2400,
    whales: 847,
    influencers: 1900,
  },
};

export type AgentType = "momentum" | "diamond" | "speculator" | "herd" | "whale" | "influencer";

const types: AgentType[] = ["momentum", "diamond", "speculator", "herd", "whale", "influencer"];

function seeded(i: number) {
  const x = Math.sin(i * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export const swarmAgents = Array.from({ length: 220 }, (_, i) => ({
  id: `AGT_${String(i).padStart(5, "0")}`,
  type: types[Math.floor(seeded(i) * 6)],
  lossAversion: +(seeded(i + 1) * 2.5 + 0.5).toFixed(2),
  herdingCoeff: +seeded(i + 2).toFixed(2),
  riskAppetite: +seeded(i + 3).toFixed(2),
  narrativeSensitivity: +seeded(i + 4).toFixed(2),
  connections: Math.floor(seeded(i + 5) * 8),
}));

export const orderBook = {
  bids: Array.from({ length: 20 }, (_, i) => ({
    price: +(0.0045 - i * 0.0001).toFixed(4),
    size: Math.floor(seeded(i + 100) * 50000),
  })),
  asks: Array.from({ length: 20 }, (_, i) => ({
    price: +(0.0046 + i * 0.0001).toFixed(4),
    size: Math.floor(seeded(i + 200) * 50000),
  })),
};

export const candlesticks = Array.from({ length: 60 }, (_, i) => {
  const base = 0.0045 + Math.sin(i / 6) * 0.0008 + seeded(i + 9) * 0.0004;
  const open = base + (seeded(i + 11) - 0.5) * 0.0003;
  const close = base + (seeded(i + 12) - 0.5) * 0.0003;
  const high = Math.max(open, close) + seeded(i + 13) * 0.0002;
  const low = Math.min(open, close) - seeded(i + 14) * 0.0002;
  return { i, open, close, high, low };
});

export const fitnessSignals = [
  { key: "Holder Count Growth", weight: 0.35, value: 0.92 },
  { key: "Temporal Dynamics", weight: 0.25, value: 0.78 },
  { key: "Trading Volume", weight: 0.2, value: 0.85 },
  { key: "Liquidity Depth", weight: 0.12, value: 0.71 },
  { key: "Social Propagation", weight: 0.08, value: 0.94 },
];

export const fitnessTrajectory = Array.from({ length: 34 }, (_, i) => ({
  gen: i + 1,
  fitness: +(0.32 + Math.log(i + 2) * 0.16 + seeded(i) * 0.05).toFixed(3),
}));

export const tokenHeatmap = Array.from({ length: 32 }, (_, t) =>
  fitnessSignals.map((s, j) => ({
    token: `T_${String(t).padStart(2, "0")}`,
    signal: s.key,
    value: +(0.2 + seeded(t * 7 + j) * 0.8).toFixed(2),
  }))
);

export const cmaParams = [
  { key: "FEE_RATE", value: "0.0025" },
  { key: "INITIAL_SUPPLY", value: "1,000,000,000" },
  { key: "BONDING_CURVE_K", value: "0.00000042" },
  { key: "LP_ALLOCATION", value: "0.35" },
  { key: "TEAM_VEST_MO", value: "6" },
];

export const culturalGenome = {
  NAME: "QUANTUM_DOGE",
  NARRATIVE: "Quantum entangled dogecoin for parallel universe traders",
  VIBE: "Absurdist · Techno-optimist · Ironic",
  LOGO_SEED: "0xA4F2...8B01",
};

export const covariance = Array.from({ length: 5 }, (_, i) =>
  Array.from({ length: 5 }, (_, j) =>
    i === j ? 1 : +(seeded(i * 5 + j) * 1.6 - 0.8).toFixed(2)
  )
);

// Phylogenetic tree
export const lineage: any = {
  name: "GEN_00",
  fitness: 0.32,
  children: Array.from({ length: 3 }, (_, a) => ({
    name: `G1_${a}`,
    fitness: 0.4 + seeded(a) * 0.1,
    children: Array.from({ length: 2 }, (_, b) => ({
      name: `G2_${a}${b}`,
      fitness: 0.5 + seeded(a + b) * 0.15,
      children: Array.from({ length: 2 }, (_, c) => ({
        name: `G3_${a}${b}${c}`,
        fitness: 0.6 + seeded(a + b + c + 3) * 0.18,
        children: Array.from({ length: 2 }, (_, d) => ({
          name: `G34_${a}${b}${c}${d}`,
          fitness: 0.7 + seeded(a + b + c + d + 7) * 0.18,
          current: a === 1 && b === 0 && c === 1,
        })),
      })),
    })),
  })),
};

export const auditEvents = [
  "EVOLUTION ENGINE EXECUTING // GEN_34 // HASH: 0x8F9B...4A21",
  "CMA-ES UPDATE // SIGMA=0.412 // EVAL_BUDGET=20480",
  "SLERP INTERPOLATION // PARENTS=0x1A..0x9C // T=0.5",
  "AGENT SWARM TICK // 15247 ALIVE // 482 NEW POSITIONS",
  "FITNESS EVAL // QUANTUM_DOGE_V34 // SCORE 0.847",
  "ORDERBOOK MUTATION // BID-ASK SPREAD 0.00012",
  "FOUR.MEME SDK // STANDBY // AWAITING THRESHOLD 0.900",
  "DGRID NODE HEARTBEAT // P2P PEERS=128 // X402 SETTLED",
  "PIEVERSE TEE // ATTESTATION OK // KEY ISOLATION VERIFIED",
  "MYX V2 // PERP MARKET PROVISION DEFERRED // TVL=11200",
  "GENERATION ROLLOVER // ARCHIVE 0x44C2...EE10",
];
