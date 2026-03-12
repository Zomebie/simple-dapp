export interface AdenaResponse<T = unknown> {
  code: number;
  status: "success" | "failure";
  type: string;
  message: string;
  data: T;
}

export interface AccountData {
  accountNumber: string;
  address: string;
  coins: string;
  chainId: string;
  sequence: string;
  status: string;
  publicKey: { "@type": string; value: string } | null;
}

export interface TransactionData {
  hash: string;
  height: string;
  checkTx: Record<string, unknown>;
  deliverTx: Record<string, unknown>;
}

export interface DoContractParams {
  messages: Array<{
    type: string;
    value: Record<string, string>;
  }>;
  gasFee: number;
  gasWanted: number;
  memo?: string;
}

export interface AdenaWallet {
  AddEstablish: (name: string) => Promise<AdenaResponse>;
  GetAccount: () => Promise<AdenaResponse<AccountData>>;
  DoContract: (params: DoContractParams) => Promise<AdenaResponse<TransactionData>>;
}

declare global {
  interface Window {
    adena?: AdenaWallet;
  }
}
