import type { ReactNode } from "react";
import { WalletContext } from "./WalletContext";
import { useWalletStore } from "@/store/wallet";
import * as walletService from "@/services/wallet";

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
