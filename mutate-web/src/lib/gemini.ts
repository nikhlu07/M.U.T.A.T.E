/**
 * Core Gemini client for M.U.T.A.T.E.
 * Uses @google/genai SDK to connect to Google AI Studio.
 * Primary: Gemma 4 31B-IT | Fallback: Gemini 2.0 Flash
 */

import { GoogleGenAI } from "@google/genai";

// ─── Configuration ──────────────────────────────────────────────────────────

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
const PRIMARY_MODEL = "gemma-4-31b-it";
const FALLBACK_MODEL = "gemini-3-flash-preview";

let _client: GoogleGenAI | null = null;
/** Track which model is active so the UI can show it */
let _activeModel: string = PRIMARY_MODEL;

function getClient(): GoogleGenAI | null {
  if (!API_KEY) {
    console.warn("[M.U.T.A.T.E.] No VITE_GEMINI_API_KEY found. AI features will use mock fallbacks.");
    return null;
  }
  if (!_client) {
    _client = new GoogleGenAI({ apiKey: API_KEY });
  }
  return _client;
}

// ─── Retry Logic ────────────────────────────────────────────────────────────

const MAX_RETRIES = 2;

/** Execute an API call with retry + automatic model fallback on 500 errors */
async function withRetry<T>(
  fn: (model: string) => Promise<T>,
  context: string
): Promise<T> {
  let lastError: unknown;

  // Try primary model with retries
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const result = await fn(PRIMARY_MODEL);
      _activeModel = PRIMARY_MODEL;
      return result;
    } catch (err: any) {
      lastError = err;
      const status = err?.status ?? err?.code ?? "";
      const isRetryable = String(status) === "500" || String(status) === "503" || err?.message?.includes("Internal");
      console.warn(`[M.U.T.A.T.E.] ${context} attempt ${attempt + 1} failed (${PRIMARY_MODEL}):`, err?.message || err);
      if (!isRetryable) throw err; // non-retryable errors propagate immediately
    }
  }

  // Fallback to flash model
  console.warn(`[M.U.T.A.T.E.] ${context}: Falling back to ${FALLBACK_MODEL}`);
  try {
    const result = await fn(FALLBACK_MODEL);
    _activeModel = FALLBACK_MODEL;
    return result;
  } catch (err) {
    console.error(`[M.U.T.A.T.E.] ${context}: Fallback also failed:`, err);
    throw lastError; // throw original error
  }
}

// ─── Public Helpers ─────────────────────────────────────────────────────────

/** Check if Gemini is available (API key configured) */
export function isGeminiAvailable(): boolean {
  return !!API_KEY;
}

/** Get the currently active model name */
export function getActiveModel(): string {
  return _activeModel;
}

/** Generate text content from a prompt */
export async function generateContent(
  prompt: string,
  options?: { systemInstruction?: string; temperature?: number; maxOutputTokens?: number }
): Promise<string> {
  const client = getClient();
  if (!client) {
    return `[MOCK] Simulated response for: ${prompt.slice(0, 60)}...`;
  }

  return withRetry(async (model) => {
    const response = await client.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: options?.systemInstruction,
        temperature: options?.temperature ?? 0.9,
        maxOutputTokens: options?.maxOutputTokens ?? 1024,
      },
    });
    return response.text ?? "[No response generated]";
  }, "generateContent");
}

/**
 * Generate structured JSON from a prompt.
 * Parses the response and returns typed data.
 * Falls back to `fallback` if parsing fails or no API key.
 */
export async function generateJSON<T>(
  prompt: string,
  fallback: T,
  options?: { systemInstruction?: string; temperature?: number }
): Promise<T> {
  const client = getClient();
  if (!client) {
    // Simulate API delay for demo consistency
    await new Promise((r) => setTimeout(r, 1500 + Math.random() * 1000));
    return fallback;
  }

  try {
    return await withRetry(async (model) => {
      const response = await client.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction: options?.systemInstruction,
          temperature: options?.temperature ?? 0.8,
          maxOutputTokens: 1024,
          responseMimeType: "application/json",
        },
      });

      const text = response.text?.trim();
      if (!text) throw new Error("Empty response");

      // Strip markdown code fences if present
      const cleaned = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
      return JSON.parse(cleaned) as T;
    }, "generateJSON");
  } catch (err) {
    console.error("[M.U.T.A.T.E.] Gemini JSON generation failed, using fallback:", err);
    return fallback;
  }
}

/**
 * Simple ping to verify Gemini connectivity.
 * Returns the model response string.
 */
export async function pingGemini(): Promise<{ ok: boolean; model: string; response: string; latencyMs: number }> {
  const start = performance.now();
  try {
    const text = await generateContent("Respond with exactly: MUTATE_ONLINE", {
      temperature: 0,
      maxOutputTokens: 32,
    });
    const latencyMs = Math.round(performance.now() - start);
    return { ok: true, model: _activeModel, response: text.trim(), latencyMs };
  } catch (err: any) {
    const latencyMs = Math.round(performance.now() - start);
    return { ok: false, model: _activeModel, response: err.message || "Connection failed", latencyMs };
  }
}
