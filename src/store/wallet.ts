import { create } from "zustand";

let toastId = 0;

interface Toast {
  id: number;
  status: "success" | "failed";
  title: string;
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
  addToast: (toast: { title: string; status: "success" | "failed"; message: string }) => void;
  removeToast: (id: number) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  isConnected: false,
  address: null,
  balance: null,
  toasts: [],

  setIsConnected: (isConnected) => set({ isConnected }),

  setAddress: (address) => set({ address }),

  setBalance: (balance) => set({ balance }),

  addToast: ({ title, status, message }) => {
    const id = ++toastId;
    set((state) => ({
      toasts: [...state.toasts, { id, title, status, message }],
    }));
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));
