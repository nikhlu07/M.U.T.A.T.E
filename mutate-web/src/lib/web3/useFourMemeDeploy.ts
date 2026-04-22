import { useState, useCallback } from "react";
import {
  useAccount,
  usePublicClient,
  useWalletClient,
} from "wagmi";
import {
  FACTORY_ADDRESS,
  FACTORY_ABI,
  getNonce,
  verifySignature,
  getCreateTokenData,
  type TokenConfig,
  type CreateTokenData,
} from "./fourMeme";
import type { Hex } from "viem";

export type DeployStage =
  | "idle"
  | "authenticating"   // signing nonce + getting access token
  | "preparing"        // calling Four.Meme API to get createToken data
  | "confirming"       // waiting for user to confirm in wallet
  | "deploying"        // tx submitted, waiting for receipt
  | "success"          // done!
  | "error";

export interface DeployResult {
  txHash: string;
  tokenAddress: string;
  bscscanUrl: string;
  fourMemeUrl: string;
}

export function useFourMemeDeploy() {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const [stage, setStage] = useState<DeployStage>("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DeployResult | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const totalSteps = 5; // auth → prepare → confirm → deploy → done

  const deploy = useCallback(
    async (config: TokenConfig) => {
      if (!walletClient || !address || !publicClient) {
        setError("Wallet not connected");
        setStage("error");
        return;
      }

      setStage("authenticating");
      setError(null);
      setResult(null);
      setCurrentStep(1);

      try {
        // ── Step 1: Authenticate with Four.Meme ──
        const nonce = await getNonce(address);
        const message = `You are sign in Meme ${nonce}`;
        const signedMessage = await walletClient.signMessage({
          message,
          account: address,
        });

        const accessToken = await verifySignature(address, signedMessage as Hex);
        setCurrentStep(2);

        // ── Step 2: Get on-chain creation payload from API ──
        setStage("preparing");
        const tokenData: CreateTokenData = await getCreateTokenData(
          config,
          accessToken
        );
        setCurrentStep(3);

        // ── Step 3: Submit on-chain transaction ──
        setStage("confirming");
        const value = BigInt(tokenData.bamount) * BigInt(10 ** 18); // convert BNB amount

        const txHash = await walletClient.writeContract({
          address: FACTORY_ADDRESS,
          abi: FACTORY_ABI,
          functionName: "createToken",
          args: [tokenData.createArg, tokenData.signature],
          value,
          chain: walletClient.chain,
          account: address,
        });
        setCurrentStep(4);

        // ── Step 4: Wait for receipt ──
        setStage("deploying");
        const receipt = await publicClient.waitForTransactionReceipt({
          hash: txHash,
        });

        const tokenAddress = receipt.logs[0]?.address || "unknown";
        setCurrentStep(5);

        const deployResult: DeployResult = {
          txHash,
          tokenAddress,
          bscscanUrl: `https://bscscan.com/tx/${txHash}`,
          fourMemeUrl: `https://four.meme/token/${tokenAddress}`,
        };

        setResult(deployResult);
        setStage("success");
        return deployResult;
      } catch (err: unknown) {
        console.error("Four.Meme deploy failed:", err);
        const message =
          err instanceof Error ? err.message : "Unknown error occurred";
        setError(message);
        setStage("error");
      }
    },
    [walletClient, address, publicClient]
  );

  const reset = useCallback(() => {
    setStage("idle");
    setError(null);
    setResult(null);
    setCurrentStep(0);
  }, []);

  return {
    deploy,
    reset,
    stage,
    error,
    result,
    currentStep,
    totalSteps,
    isConnected,
    address,
  };
}
