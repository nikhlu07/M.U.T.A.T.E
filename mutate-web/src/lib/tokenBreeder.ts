/**
 * Token Breeder — AI-powered Cultural Evolution Engine
 * Uses Gemma 4 31B via Google AI Studio to breed, mutate,
 * and evaluate memecoin cultural genomes.
 */

import { generateJSON, generateContent } from "./gemini";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface CulturalGenome {
  name: string;
  symbol: string;
  narrative: string;
  vibe: string;
  logoSeed: string;
}

export interface BreedingResult {
  child: CulturalGenome;
  reasoning: string;
  crossoverType: string;
}

export interface FitnessEvaluation {
  narrativeCoherence: number;
  viralityPotential: number;
  culturalResonance: number;
  overallScore: number;
  reasoning: string;
}

// ─── System Prompts ─────────────────────────────────────────────────────────

const BREEDER_SYSTEM = `You are M.U.T.A.T.E., a high-performance evolutionary memecoin breeding engine.
You operate as the Cultural Engine within a dual-engine evolutionary system.
Your job is to create culturally compelling, viral, and memorable memecoin identities.
Rules:
- Names must be max 20 characters, all uppercase, using underscores for spaces
- Symbols must be 3-5 characters, all uppercase
- Narratives must be punchy, memetic, and under 120 characters
- Vibes should be 2-4 descriptive adjectives separated by " · "
- Logo seeds should be hex-formatted conceptual hashes (fake, for display)
- Always respond in valid JSON only, no markdown`;

// ─── Mock Data ──────────────────────────────────────────────────────────────

const MOCK_GENOMES: CulturalGenome[] = [
  { name: "QUANTUM_DOGE", symbol: "QDOGE", narrative: "Quantum entangled dogecoin for parallel universe traders", vibe: "Absurdist · Techno-optimist · Ironic", logoSeed: "0xA4F2...8B01" },
  { name: "NEURAL_BARK", symbol: "NBARK", narrative: "A dogmatic AI logic gate trained on billions of barks", vibe: "Scientific · Playful · Recursive", logoSeed: "0xB7C1...3D09" },
  { name: "TENSOR_TURTLE", symbol: "TTURT", narrative: "Slow and steady, computing matrix ops in an armored shell", vibe: "Patient · Technical · Wholesome", logoSeed: "0xC3E5...9A44" },
  { name: "SCHRODINGER_CAT", symbol: "SCAT", narrative: "The token pumps based entirely on whether you check the chart", vibe: "Philosophical · Absurd · Meta", logoSeed: "0xD9F0...1B22" },
  { name: "COSMIC_APE", symbol: "CAPE", narrative: "Primates achieving interstellar consciousness through DeFi", vibe: "Cosmic · Degen · Visionary", logoSeed: "0xE1A3...5C77" },
  { name: "PIXEL_FROG", symbol: "PFROG", narrative: "8-bit amphibian navigating the blockchain lily pads", vibe: "Retro · Chill · Nostalgic", logoSeed: "0xF6B2...7E33" },
];

function randomMock(): CulturalGenome {
  return MOCK_GENOMES[Math.floor(Math.random() * MOCK_GENOMES.length)];
}

// ─── Public API ─────────────────────────────────────────────────────────────

/**
 * Breed two parent cultural genomes into a child.
 * Uses Gemma 4 to perform "semantic crossover" — blending
 * names, narratives, and vibes from both parents.
 */
export async function breedTokenCulture(
  parentA: CulturalGenome,
  parentB: CulturalGenome
): Promise<BreedingResult> {
  const prompt = `Perform semantic crossover between two memecoin parent genomes to create a child.

PARENT A:
- Name: ${parentA.name}
- Symbol: ${parentA.symbol}
- Narrative: ${parentA.narrative}
- Vibe: ${parentA.vibe}

PARENT B:
- Name: ${parentB.name}
- Symbol: ${parentB.symbol}
- Narrative: ${parentB.narrative}
- Vibe: ${parentB.vibe}

Create a CHILD that inherits traits from both parents but is uniquely its own.
The child should blend the cultural DNA — take the strongest memetic elements from each parent.

Respond with JSON: { "child": { "name": string, "symbol": string, "narrative": string, "vibe": string, "logoSeed": string }, "reasoning": string, "crossoverType": string }`;

  const fallback: BreedingResult = {
    child: randomMock(),
    reasoning: "Mock crossover: selected from pre-computed genome pool due to offline mode.",
    crossoverType: "MOCK_SLERP",
  };

  return generateJSON<BreedingResult>(prompt, fallback, {
    systemInstruction: BREEDER_SYSTEM,
    temperature: 0.95,
  });
}

/**
 * Apply creative mutation to a token's cultural genome.
 * mutationStrength: 0.0 (subtle) to 1.0 (radical)
 */
export async function mutateTokenCulture(
  token: CulturalGenome,
  mutationStrength: number = 0.3
): Promise<CulturalGenome> {
  const strengthLabel =
    mutationStrength < 0.3 ? "subtle" :
    mutationStrength < 0.7 ? "moderate" :
    "radical";

  const prompt = `Apply a ${strengthLabel} creative mutation (strength: ${mutationStrength.toFixed(2)}) to this memecoin genome:

Current genome:
- Name: ${token.name}
- Symbol: ${token.symbol}
- Narrative: ${token.narrative}
- Vibe: ${token.vibe}
- Logo Seed: ${token.logoSeed}

Mutate the genome — alter 1-3 traits depending on mutation strength.
For subtle: tweak narrative wording or one vibe adjective.
For moderate: change name variation, update narrative theme.
For radical: completely reimagine while keeping a thematic thread.

Respond with JSON: { "name": string, "symbol": string, "narrative": string, "vibe": string, "logoSeed": string }`;

  return generateJSON<CulturalGenome>(prompt, { ...token, logoSeed: `0x${Math.random().toString(16).slice(2, 6).toUpperCase()}...${Math.random().toString(16).slice(2, 6).toUpperCase()}` }, {
    systemInstruction: BREEDER_SYSTEM,
    temperature: 0.7 + mutationStrength * 0.5,
  });
}

/**
 * Generate a full token cultural genome from scratch.
 * Used for initial population seeding.
 */
export async function generateTokenGenome(theme?: string): Promise<CulturalGenome> {
  const themeHint = theme || "trending internet culture mixed with crypto and animals";

  const prompt = `Generate a fresh, original memecoin cultural genome inspired by: "${themeHint}".

Create something that would go viral on crypto Twitter. Be creative, absurd, and memorable.

Respond with JSON: { "name": string, "symbol": string, "narrative": string, "vibe": string, "logoSeed": string }`;

  return generateJSON<CulturalGenome>(prompt, randomMock(), {
    systemInstruction: BREEDER_SYSTEM,
    temperature: 1.0,
  });
}

/**
 * Evaluate a token's cultural fitness using AI.
 * Returns scores for narrative coherence, virality potential,
 * and cultural resonance.
 */
export async function evaluateCulturalFitness(token: CulturalGenome): Promise<FitnessEvaluation> {
  const prompt = `Evaluate this memecoin's cultural fitness:

- Name: ${token.name}
- Symbol: ${token.symbol}
- Narrative: ${token.narrative}
- Vibe: ${token.vibe}

Score each dimension from 0.0 to 1.0:
1. narrativeCoherence — Does the narrative make sense and align with the name/vibe?
2. viralityPotential — Would this go viral on crypto Twitter? Is it shareable?
3. culturalResonance — Does it tap into current cultural zeitgeist?

Also compute overallScore as weighted average: 0.3*narrativeCoherence + 0.4*viralityPotential + 0.3*culturalResonance

Respond with JSON: { "narrativeCoherence": number, "viralityPotential": number, "culturalResonance": number, "overallScore": number, "reasoning": string }`;

  const fallback: FitnessEvaluation = {
    narrativeCoherence: 0.6 + Math.random() * 0.3,
    viralityPotential: 0.5 + Math.random() * 0.4,
    culturalResonance: 0.55 + Math.random() * 0.35,
    overallScore: 0.6 + Math.random() * 0.25,
    reasoning: "Mock evaluation: offline mode — random fitness assigned.",
  };

  return generateJSON<FitnessEvaluation>(prompt, fallback, {
    systemInstruction: BREEDER_SYSTEM,
    temperature: 0.4,
  });
}

/**
 * Generate a rich lore description for a token.
 * Used for the graduation ceremony and token display.
 */
export async function generateTokenLore(token: CulturalGenome): Promise<string> {
  const prompt = `Write a 2-3 sentence dramatic lore description for this memecoin:

Name: ${token.name} ($${token.symbol})
Narrative: ${token.narrative}
Vibe: ${token.vibe}

Make it sound epic, memetic, and crypto-native. Like a token that survived 50 generations of evolutionary pressure.`;

  return generateContent(prompt, {
    systemInstruction: BREEDER_SYSTEM,
    temperature: 0.9,
    maxOutputTokens: 256,
  });
}
