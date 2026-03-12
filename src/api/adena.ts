import type { AccountData, Response, AdenaWallet, DoContractParams, TransactionData } from "@/types";

let adenaInstance: AdenaWallet | null = null;

function getAdena(): AdenaWallet {
  if (!adenaInstance) {
    if (!window.adena) {
      throw new Error("Please install Adena wallet extension.");
    }
    adenaInstance = window.adena;
  }
  return adenaInstance;
}

export async function establish(siteName: string): Promise<Response> {
  const adena = getAdena();
  return adena.AddEstablish(siteName);
}

export async function getAccount(): Promise<Response<AccountData>> {
  const adena = getAdena();
  return adena.GetAccount();
}

export async function doContract(params: DoContractParams): Promise<Response<TransactionData>> {
  const adena = getAdena();
  return adena.DoContract(params);
}
