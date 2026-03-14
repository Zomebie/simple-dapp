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
  toasts: Toast[];
  setIsConnected: (isConnected: boolean) => void;
  addToast: (toast: { title: string; status: "success" | "failed"; message: string }) => void;
  removeToast: (id: number) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  isConnected: false,
  toasts: [],

  setIsConnected: (isConnected) => set({ isConnected }),

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
