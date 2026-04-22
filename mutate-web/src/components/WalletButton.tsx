import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";

export const WalletButton = () => (
  <ConnectButton.Custom>
    {({
      account,
      chain,
      openAccountModal,
      openChainModal,
      openConnectModal,
      mounted,
    }) => {
      const ready = mounted;
      const connected = ready && account && chain;

      return (
        <div
          {...(!ready && {
            "aria-hidden": true,
            style: {
              opacity: 0,
              pointerEvents: "none" as const,
              userSelect: "none" as const,
            },
          })}
        >
          {(() => {
            if (!connected) {
              return (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openConnectModal}
                  className="flex items-center gap-3 border border-infrared/40 px-4 py-2 bg-canvas/80 backdrop-blur-sm shadow-[0_0_15px_rgba(255,68,0,0.1)] transition-all hover:border-infrared hover:shadow-[0_0_20px_rgba(255,68,0,0.2)] relative overflow-hidden cursor-pointer group"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-infrared animate-pulse" />
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-infrared opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-infrared" />
                  </span>
                  <span className="font-mono text-[10px] text-ink uppercase tracking-[0.15em] font-bold relative z-10 group-hover:text-infrared transition-colors">
                    CONNECT WALLET
                  </span>
                </motion.button>
              );
            }

            if (chain.unsupported) {
              return (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openChainModal}
                  className="flex items-center gap-3 border border-[hsl(354,96%,43%)]/50 px-4 py-2 bg-canvas/80 backdrop-blur-sm relative overflow-hidden cursor-pointer"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-[hsl(354,96%,43%)] animate-pulse" />
                  <span className="font-mono text-[10px] text-[hsl(354,96%,43%)] uppercase tracking-[0.15em] font-bold">
                    WRONG NETWORK
                  </span>
                </motion.button>
              );
            }

            return (
              <div className="flex items-center gap-2">
                {/* Chain indicator */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={openChainModal}
                  className="flex items-center gap-2 border border-ink/10 px-3 py-2 bg-canvas/80 backdrop-blur-sm transition-all hover:border-ink/30 relative overflow-hidden cursor-pointer"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#F0B90B]" />
                  {chain.hasIcon && chain.iconUrl && (
                    <img
                      alt={chain.name ?? "Chain"}
                      src={chain.iconUrl}
                      className="w-3 h-3"
                    />
                  )}
                  <span className="font-mono text-[9px] text-ink/60 uppercase tracking-widest hidden xl:inline">
                    {chain.name}
                  </span>
                </motion.button>

                {/* Account button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={openAccountModal}
                  className="flex items-center gap-3 border border-ink/20 px-4 py-2 bg-canvas/80 backdrop-blur-sm shadow-sm transition-all hover:border-infrared/40 hover:shadow-[0_0_15px_rgba(255,68,0,0.08)] relative overflow-hidden cursor-pointer group"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-[hsl(51,100%,50%)] group-hover:bg-infrared transition-colors" />
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[hsl(51,100%,50%)]" />
                  </span>
                  <span className="font-mono text-[10px] text-ink uppercase tracking-[0.12em] font-bold relative z-10">
                    {account.displayName}
                  </span>
                  {account.displayBalance && (
                    <span className="font-mono text-[9px] text-ink/50 tracking-widest relative z-10 hidden xl:inline">
                      {account.displayBalance}
                    </span>
                  )}
                </motion.button>
              </div>
            );
          })()}
        </div>
      );
    }}
  </ConnectButton.Custom>
);
