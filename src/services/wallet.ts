import * as adenaApi from "@/api/wallet";

const SITE_NAME = "Adena Wallet Integration";

export async function connectWallet(): Promise<string> {
  const response = await adenaApi.establish(SITE_NAME);

  if (response.status !== "success" && response.type !== "ALREADY_CONNECTED") {
    throw new Error(response.message || "Failed to connect wallet");
  }

  const account = await adenaApi.getAccount();
  if (account.status !== "success") {
    throw new Error(account.message || "Failed to get account");
  }

  return account.data.address;
}

export async function getAddress(): Promise<string> {
  const account = await adenaApi.getAccount();
  if (account.status !== "success") {
    throw new Error(account.message || "Failed to get account");
  }
  return account.data.address;
}

export async function getBalance(): Promise<string> {
  const account = await adenaApi.getAccount();
  if (account.status !== "success") {
    throw new Error(account.message || "Failed to get account");
  }
  return account.data.coins;
}

export interface SendGnotResult {
  status: "success" | "failed";
  txHash: string | null;
}

export async function sendGnot(toAddress: string, amount: string): Promise<SendGnotResult> {
  const account = await adenaApi.getAccount();
  if (account.status !== "success") {
    throw new Error(account.message || "Failed to get account");
  }

  const response = await adenaApi.doContract({
    messages: [
      {
        type: "/bank.MsgSend",
        value: {
          from_address: account.data.address,
          to_address: toAddress,
          amount: `${amount}ugnot`,
        },
      },
    ],
  });

  return {
    status: response.status === "success" ? "success" : "failed",
    txHash: response.data?.hash ?? null,
  };
}
