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
  connect: () => void;
  setAddress: (address: string | null) => void;
  setBalance: (balance: string | null) => void;
  addToast: (status: "success" | "failed", message: string | null) => void;
  removeToast: (id: number) => void;
}

let toastId = 0;

export const useWalletStore = create<WalletState>((set) => ({
  isConnected: false,
  address: null,
  balance: null,
  toasts: [],

  connect: () => set({ isConnected: true }),

  setAddress: (address) => set({ address }),

  setBalance: (balance) => set({ balance }),

  addToast: (status, message) => {
    const id = ++toastId;
    set((state) => ({
      toasts: [...state.toasts, { id, status, message }],
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 3000);
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
