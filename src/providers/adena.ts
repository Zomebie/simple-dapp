import type { WalletProvider, AdenaWallet } from "@/types";

export class AdenaProvider implements WalletProvider {
  private instance: AdenaWallet | null = null;

  private getAdena(): AdenaWallet {
    if (!this.instance) {
      if (!window.adena) {
        throw new Error("Please install Adena wallet extension.");
      }
      this.instance = window.adena;
    }
    return this.instance;
  }

  async establish(name: string) {
    return this.getAdena().AddEstablish(name);
  }

  async getAccount() {
    return this.getAdena().GetAccount();
  }

  async doContract(params: Parameters<WalletProvider["doContract"]>[0]) {
    return this.getAdena().DoContract(params);
  }
}
