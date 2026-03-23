import type { WalletProvider } from "@/types";
import { AdenaProvider } from "./providers/adena";

let provider: WalletProvider = new AdenaProvider();

export function setWalletProvider(newProvider: WalletProvider) {
  provider = newProvider;
}

export function getWalletProvider(): WalletProvider {
  return provider;
}

export async function establish(siteName: string) {
  return provider.establish(siteName);
}

export async function getAccount() {
  return provider.getAccount();
}

export async function doContract(params: Parameters<WalletProvider["doContract"]>[0]) {
  return provider.doContract(params);
}
