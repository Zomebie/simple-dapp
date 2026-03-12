import { create } from "zustand";

interface Toast {
  id: number;
  status: "success" | "failed";
  message: string | null;
}

interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string | null;
  toasts: Toast[];
  setIsConnected: (isConnected: boolean) => void;
  setAddress: (address: string | null) => void;
  setBalance: (balance: string | null) => void;
  addToast: (status: "success" | "failed", message: string | null) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  isConnected: false,
  address: null,
  balance: null,
  toasts: [],

  setIsConnected: (isConnected) => set({ isConnected }),

  setAddress: (address) => set({ address }),

  setBalance: (balance) => set({ balance }),

  addToast: (status, message) => {
    const id = Date.now();
    set((state) => ({
      toasts: [...state.toasts, { id: Date.now(), status, message }],
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 3000);
  },
}));
