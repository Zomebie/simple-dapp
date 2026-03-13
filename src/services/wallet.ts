import * as adenaApi from "@/api/wallet";
import { formatBalance } from "@/utils/format";

const SITE_NAME = "Adena Wallet Integration";

async function getVerifiedAccount() {
  const account = await adenaApi.getAccount();
  if (account.status !== "success") {
    throw new Error(account.message || "Failed to get account");
  }
  return account.data;
}

export async function connectWallet(): Promise<string> {
  const response = await adenaApi.establish(SITE_NAME);

  // Adena는 연결 실패 시 status: "failure"를 반환하지만,
  // 이미 연결된 경우에는 status는 "failure"이면서 type: "ALREADY_CONNECTED"로 구분한다.
  if (response.status !== "success" && response.type !== "ALREADY_CONNECTED") {
    throw new Error(response.message || "Failed to connect wallet");
  }

  const account = await getVerifiedAccount();
  return account.address;
}

export async function getAddress(): Promise<string> {
  const account = await getVerifiedAccount();
  return account.address;
}

export async function getBalance(): Promise<string> {
  const account = await getVerifiedAccount();
  return formatBalance(account.coins);
}

export interface SendGnotResult {
  status: "success" | "failed";
  txHash: string | null;
}

export async function sendGnot(toAddress: string, amount: string): Promise<SendGnotResult> {
  const account = await getVerifiedAccount();

  const response = await adenaApi.doContract({
    messages: [
      {
        type: "/bank.MsgSend",
        value: {
          from_address: account.address,
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
