/**
 * DGrid compatibility layer.
 * Routes all AI calls through the centralized Gemini client (gemma-4-31b-it).
 * Preserves the original API surface for Integration.tsx and Graduation.tsx.
 */

import { generateContent, generateJSON, pingGemini } from "./gemini";
import { generateTokenGenome, type CulturalGenome } from "./tokenBreeder";

/**
 * Simulate a Gemma call — now routes through Google AI Studio.
 * Used by Integration.tsx "PING API" button.
 */
export const simulateGemmaCall = async (prompt: string): Promise<string> => {
  return generateContent(prompt, { temperature: 0.8, maxOutputTokens: 256 });
};

/**
 * Ping the AI backend. Returns structured status info.
 */
export const pingAI = pingGemini;

/**
 * Generate a culturally-evolved token config using Gemma 4 via AI Studio.
 * Used by Graduation.tsx for the graduation ceremony.
 */
export const generateCulturalToken = async (): Promise<{
  name: string;
  symbol: string;
  description: string;
  imageUrl: string;
  twitter: string;
}> => {
  const genome: CulturalGenome = await generateTokenGenome(
    "quantum physics meets viral internet animals — evolved through 50 generations of AI selection"
  );

  return {
    name: genome.name,
    symbol: genome.symbol,
    description: genome.narrative,
    imageUrl: "",
    twitter: "",
  };
};
