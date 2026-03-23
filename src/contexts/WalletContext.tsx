import { createContext, useContext } from "react";
import type { SendGnotResult } from "@/services/wallet";

export interface WalletContextValue {
  isConnected: boolean;
  setIsConnected: (v: boolean) => void;
  addToast: (toast: { title: string; status: "success" | "failed"; message: string }) => void;
  connectWallet: () => Promise<string>;
  getAddress: () => Promise<string>;
  getBalance: () => Promise<string>;
  sendGnot: (toAddress: string, amount: string) => Promise<SendGnotResult>;
}

export const WalletContext = createContext<WalletContextValue | null>(null);

export function useWallet(): WalletContextValue {
  const ctx = useContext(WalletContext);
  if (!ctx) {
    throw new Error("useWallet must be used within a WalletContextProvider");
  }
  return ctx;
}
