import type { ReactNode } from "react";
import { WalletContext } from "./WalletContext";
import { useWalletStore } from "@/store/wallet";
import { setWalletProvider } from "@/api/wallet";
import { AdenaProvider } from "@/api/providers/adena";
import * as walletService from "@/services/wallet";

setWalletProvider(new AdenaProvider());

export default function WalletContextProvider({ children }: { children: ReactNode }) {
  const { isConnected, setIsConnected, addToast } = useWalletStore();

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        setIsConnected,
        addToast,
        connectWallet: walletService.connectWallet,
        getAddress: walletService.getAddress,
        getBalance: walletService.getBalance,
        sendGnot: walletService.sendGnot,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
