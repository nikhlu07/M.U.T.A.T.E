import { useState } from "react";
import { VaultCard } from "@/components/VaultCard";
import { AgentBadge } from "@/components/AgentBadge";
import { StatusDot } from "@/components/StatusDot";
import { pingAI, simulateGemmaCall } from "@/lib/dgrid";
import { isGeminiAvailable } from "@/lib/gemini";
import { Loader2, Zap, ShieldCheck } from "lucide-react";

const integrations = [
  { name: "FOUR.MEME SDK", role: "TOKEN DEPLOYMENT", detail: "Auth + create-instant + 8004-register" },
  { name: "GOOGLE AI STUDIO", role: "GEMMA 4 31B-IT ENGINE", detail: "Cultural crossover + swarm simulation via Google AI Studio" },
  { name: "PIEVERSE PURRFECT CLAW", role: "SECURE WALLET (TEE)", detail: "x402b gasless + key isolation" },
  { name: "MYX FINANCE V2", role: "PERPETUAL MARKETS", detail: "$20K TVL → auto perp market" },
];

const details = [
  {
    name: "FOUR.MEME",
    rows: [
      ["AUTH", "POST /meme-api/v1/public/user/login"],
      ["DEPLOY", "fourmeme create-instant"],
      ["REGISTER", "fourmeme 8004-register → NFT"],
    ],
  },
  {
    name: "GOOGLE AI STUDIO",
    rows: [
      ["MODEL", "gemma-4-31b-it"],
      ["SDK", "@google/genai (v1.x)"],
      ["FEATURES", "Cultural crossover · Swarm AI · Fitness eval"],
      ["THROUGHPUT", "6 archetype agents / generation cycle"],
    ],
  },
  {
    name: "PIEVERSE",
    rows: [
      ["ENCLAVE", "TEE attestation"],
      ["TXN", "x402b gasless"],
      ["AUDIT", "Auditable trail"],
    ],
  },
  {
    name: "MYX FINANCE V2",
    rows: [
      ["TRIGGER", "$20K TVL threshold"],
      ["MARKET", "Auto perpetual provision"],
      ["ENGINE", "V2 matching integration"],
    ],
  },
];

const Integration = () => {
  const [aiStatus, setAiStatus] = useState<"idle" | "pinging" | "success" | "error">("idle");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiLatency, setAiLatency] = useState<number | null>(null);
  const geminiReady = isGeminiAvailable();

  const testAI = async () => {
    setAiStatus("pinging");
    setAiResponse(null);
    setAiLatency(null);

    try {
      const result = await pingAI();
      setAiResponse(`[${result.model}] ${result.response}`);
      setAiLatency(result.latencyMs);
      setAiStatus(result.ok ? "success" : "error");
    } catch {
      setAiStatus("error");
      setAiResponse("Connection failed");
    }

    setTimeout(() => setAiStatus("idle"), 8000);
  };

  const [narrativeResp, setNarrativeResp] = useState<string | null>(null);
  const [narrativeLoading, setNarrativeLoading] = useState(false);

  const testNarrative = async () => {
    setNarrativeLoading(true);
    setNarrativeResp(null);
    const res = await simulateGemmaCall(
      "Generate a 1-sentence memecoin origin story for a quantum-entangled dog that trades crypto across parallel dimensions."
    );
    setNarrativeResp(res);
    setNarrativeLoading(false);
  };

  return (
    <section className="mx-auto max-w-[1440px] px-6 pt-10 pb-12">
      <p className="mono mb-3">/ INTEGRATION // BNB CHAIN TOPOLOGY</p>
      <h2 className="display text-[clamp(2rem,5vw,4rem)] mb-10">DEPLOYMENT MESH</h2>

      {/* topology */}
      <VaultCard label="INTEGRATION FLOW">
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 items-center min-h-[320px]">
          <div className="md:col-start-2 md:row-start-1">
            <div className="border border-infrared p-6 text-center">
              <p className="mono">CORE</p>
              <div className="display text-[28px] mt-1">M.U.T.A.T.E. ENGINE</div>
              <div className="mt-3 flex justify-center"><StatusDot color="infrared" /></div>
            </div>
          </div>
          {integrations.map((it, i) => (
            <div key={it.name} className={[
              "border border-ink p-5 flex flex-col justify-between h-full",
              i === 0 ? "md:col-start-1 md:row-start-1" : "",
              i === 1 ? "md:col-start-3 md:row-start-1 border-[#4285F4] shadow-[0_0_15px_rgba(66,133,244,0.15)] relative" : "",
              i === 2 ? "md:col-start-1 md:row-start-2" : "",
              i === 3 ? "md:col-start-3 md:row-start-2" : "",
            ].join(" ")}>
              {i === 1 && <div className="absolute top-0 left-0 w-1 h-full bg-[#4285F4]" />}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="mono">{it.role}</p>
                  <StatusDot color={i === 1 ? "success-gold" : "ink"} />
                </div>
                <div className="font-display font-bold uppercase text-[18px] tracking-tight">{it.name}</div>
                <p className="text-[13px] mt-2 text-ink/80">{it.detail}</p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-ink/10 flex items-center justify-between">
                 <AgentBadge>{i === 1 ? (geminiReady ? "API KEY: SET" : "API KEY: MISSING") : "STATUS: CONNECTED"}</AgentBadge>
                 {i === 1 && (
                    <button 
                      onClick={testAI} 
                      disabled={aiStatus === "pinging"}
                      className="font-mono text-[10px] bg-[#4285F4]/10 text-[#4285F4] px-2 py-1 uppercase tracking-widest border border-[#4285F4]/30 hover:bg-[#4285F4] hover:text-canvas transition-colors flex items-center gap-2"
                    >
                      {aiStatus === "pinging" ? <><Loader2 className="w-3 h-3 animate-spin"/> PINGING...</> : 
                       aiStatus === "success" ? <><ShieldCheck className="w-3 h-3"/> CONNECTED</> :
                       <><Zap className="w-3 h-3"/> PING GEMMA 4</>}
                    </button>
                 )}
              </div>
              {i === 1 && aiResponse && (
                  <div className="mt-3 bg-ink/5 p-3 border border-[#4285F4]/20 font-mono text-[9px] overflow-hidden space-y-1">
                      <div className="flex justify-between text-[#4285F4]/60">
                        <span>MODEL: gemma-4-31b-it</span>
                        {aiLatency && <span>LATENCY: {aiLatency}ms</span>}
                      </div>
                      <span className="text-[#4285F4]/80 break-words block">{">"} {aiResponse}</span>
                  </div>
              )}
            </div>
          ))}
        </div>
      </VaultCard>

      {/* AI Narrative Test Panel */}
      <VaultCard label="GEMMA 4 // CULTURAL ENGINE LIVE TEST" className="mt-8">
        <div className="flex flex-col gap-4">
          <p className="font-mono text-[11px] text-ink/60 uppercase tracking-widest">
            Test the Gemma 4 31B cultural engine — generate a memecoin narrative in real-time.
          </p>
          <button
            onClick={testNarrative}
            disabled={narrativeLoading}
            className="btn-secondary w-fit flex items-center gap-2"
          >
            {narrativeLoading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> GENERATING NARRATIVE...</>
            ) : (
              "⚡ GENERATE NARRATIVE"
            )}
          </button>
          {narrativeResp && (
            <div className="border border-ink/20 bg-ink/[0.03] p-4 font-mono text-[12px] text-ink/90 leading-relaxed">
              <span className="text-infrared font-bold mr-2">AI OUTPUT:</span>
              {narrativeResp}
            </div>
          )}
        </div>
      </VaultCard>

      {/* detail grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {details.map((d) => (
          <VaultCard key={d.name} label={d.name}>
            <div className="font-mono text-[12px] uppercase tracking-[0.08em] space-y-2">
              {d.rows.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-ink/10 pb-1">
                  <span className="text-graphite shrink-0">{k}</span>
                  <span className="text-ink text-right break-all">{v}</span>
                </div>
              ))}
            </div>
          </VaultCard>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="mono mb-3">CHAIN TARGET</p>
        <div className="display text-[clamp(3rem,10vw,8rem)] text-graphite/40">BNB CHAIN MAINNET</div>
      </div>
    </section>
  );
};

export default Integration;
