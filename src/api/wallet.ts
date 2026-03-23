import type { WalletProvider } from "@/types";

let provider: WalletProvider | null = null;

function getProvider(): WalletProvider {
  if (!provider) {
    throw new Error("WalletProvider is not initialized. Call setWalletProvider() first.");
  }
  return provider;
}

export function setWalletProvider(newProvider: WalletProvider) {
  provider = newProvider;
}

export function getWalletProvider(): WalletProvider {
  return getProvider();
}

export async function establish(siteName: string) {
  return getProvider().establish(siteName);
}

export async function getAccount() {
  return getProvider().getAccount();
}

export async function doContract(params: Parameters<WalletProvider["doContract"]>[0]) {
  return getProvider().doContract(params);
}
