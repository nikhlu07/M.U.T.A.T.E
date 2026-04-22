import { useState } from "react";
import { VaultCard } from "@/components/VaultCard";
import { AgentBadge } from "@/components/AgentBadge";
import { StatusDot } from "@/components/StatusDot";
import { simulateGemmaCall } from "@/lib/dgrid";
import { Loader2 } from "lucide-react";

const integrations = [
  { name: "FOUR.MEME SDK", role: "TOKEN DEPLOYMENT", detail: "Auth + create-instant + 8004-register" },
  { name: "DGRID AI GATEWAY", role: "AGENT INFRASTRUCTURE", detail: "Hardware-anchored leaderless P2P" },
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
    name: "DGRID",
    rows: [
      ["TOPOLOGY", "Hardware-anchored leaderless P2P"],
      ["SETTLEMENT", "x402 micro-settlement"],
      ["CAPACITY", "15K agent concurrent"],
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
  const [dgridStatus, setDgridStatus] = useState<"idle" | "pinging" | "success">("idle");
  const [dgridResponse, setDgridResponse] = useState<string | null>(null);

  const testDgrid = async () => {
    setDgridStatus("pinging");
    setDgridResponse(null);
    const res = await simulateGemmaCall("Provide a 1-sentence meme coin narrative snippet for a quantum dog.");
    setDgridResponse(res);
    setDgridStatus("success");
    setTimeout(() => {
        setDgridStatus("idle");
    }, 5000)
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
              i === 1 ? "md:col-start-3 md:row-start-1 border-success-gold shadow-[0_0_15px_rgba(255,215,0,0.1)] relative" : "",
              i === 2 ? "md:col-start-1 md:row-start-2" : "",
              i === 3 ? "md:col-start-3 md:row-start-2" : "",
            ].join(" ")}>
              {i === 1 && <div className="absolute top-0 left-0 w-1 h-full bg-success-gold" />}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="mono">{it.role}</p>
                  <StatusDot color={i === 1 ? "success-gold" : "ink"} />
                </div>
                <div className="font-display font-bold uppercase text-[18px] tracking-tight">{it.name}</div>
                <p className="text-[13px] mt-2 text-ink/80">{it.detail}</p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-ink/10 flex items-center justify-between">
                 <AgentBadge>STATUS: CONNECTED</AgentBadge>
                 {i === 1 && (
                    <button 
                      onClick={testDgrid} 
                      disabled={dgridStatus !== "idle"}
                      className="font-mono text-[10px] bg-success-gold/10 text-success-gold px-2 py-1 uppercase tracking-widest border border-success-gold/30 hover:bg-success-gold hover:text-ink transition-colors flex items-center gap-2"
                    >
                      {dgridStatus === "pinging" ? <><Loader2 className="w-3 h-3 animate-spin"/> PINGING...</> : "PING API"}
                    </button>
                 )}
              </div>
              {i === 1 && dgridResponse && (
                  <div className="mt-3 bg-ink/5 p-2 border border-success-gold/20 font-mono text-[9px] text-success-gold/80 overflow-hidden">
                      <span className="opacity-50 break-words">{">"} {dgridResponse}</span>
                  </div>
              )}
            </div>
          ))}
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
