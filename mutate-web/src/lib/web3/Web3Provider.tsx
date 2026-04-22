import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { config } from "./config";
import type { ReactNode } from "react";

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider = ({ children }: Web3ProviderProps) => (
  <WagmiProvider config={config}>
    <RainbowKitProvider
      theme={darkTheme({
        accentColor: "hsl(12, 100%, 50%)",     // infrared
        accentColorForeground: "#000",
        borderRadius: "none",
        fontStack: "system",
        overlayBlur: "small",
      })}
      modalSize="compact"
    >
      {children}
    </RainbowKitProvider>
  </WagmiProvider>
);
