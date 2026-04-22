import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  walletConnectWallet,
  coinbaseWallet,
  binanceWallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { http } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";

// WalletConnect Cloud Project ID
// Get yours at: https://cloud.walletconnect.com/
const WALLETCONNECT_PROJECT_ID =
  import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || "04db0da42c4e44e9a3c6e5e34eefca90";

export const config = getDefaultConfig({
  appName: "M.U.T.A.T.E.",
  projectId: WALLETCONNECT_PROJECT_ID,
  chains: [bsc, bscTestnet],
  transports: {
    [bsc.id]: http("https://bsc-dataseed.binance.org/"),
    [bscTestnet.id]: http("https://data-seed-prebsc-1-s1.binance.org:8545/"),
  },
  wallets: [
    {
      groupName: "BNB Chain Wallets",
      wallets: [
        metaMaskWallet,
        binanceWallet,
        trustWallet,
        coinbaseWallet,
        walletConnectWallet,
      ],
    },
  ],
  // Disable auto-detection of installed wallets (hides Phantom, HashPack, etc.)
  multiInjectedProviderDiscovery: false,
  ssr: false,
});

// Four.Meme exchange proxy on BSC mainnet
export const FOUR_MEME_CONTRACT = "0x5c952063c7fc8610ffdb798152d69f0b9550762b" as const;
