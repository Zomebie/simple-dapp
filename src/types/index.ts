export interface Response<T = unknown> {
  code: number;
  status: "success" | "failure";
  type: string;
  message: string;
  data: T;
}

export interface Account {
  accountNumber: string;
  address: string;
  coins: string;
  chainId: string;
  sequence: string;
  status: string;
  publicKey: { "@type": string; value: string };
}

export interface Transaction {
  hash: string;
  height: string;
  checkTx: Record<string, unknown>;
  deliverTx: Record<string, unknown>;
}

export interface DoContractParams {
  messages: Array<{
    type: "/bank.MsgSend" | "/vm.m_call" | "/vm.m_addpkg" | "/vm.m_run",
    value:{ [key: string]: unknown}
  }>;
  tx:Transaction;
  memo?: string;
  isNotification?: boolean;
}

export interface AdenaWallet {
  AddEstablish: (name: string) => Promise<Response>;
  GetAccount: () => Promise<Response<Account>>;
  DoContract: (params: DoContractParams) => Promise<Response<Transaction>>;
}

declare global {
  interface Window {
    adena?: AdenaWallet;
  }
}
