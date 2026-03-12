import { useState } from "react";
import { useWalletStore } from "../store/wallet";
import { getBalance } from "../services/wallet";
import Card from "./Card";
import Button from "./Button";
import styled from "styled-components";

const Info = styled.div`
  font-size: 13px;
  margin: 0;
  background: #f5f5f7;
  padding: 12px 16px;
  border-radius: 10px;
  color: #1d1d1f;
  font-family: "SF Mono", SFMono-Regular, ui-monospace, monospace;
  line-height: 1.5;
`;

export default function GetBalance() {
  const { isConnected, addToast } = useWalletStore();
  const [balance, setBalance] = useState<string | null>(null);

  const handleGetBalance = async () => {
    try {
      const bal = await getBalance();
      setBalance(bal);
    } catch (error) {
      console.error(error);
      addToast("failed", error instanceof Error ? error.message : "Failed to get balance");
    }
  };

  return (
    <Card title="Get Balance">
      {balance !== null && <Info>{balance}</Info>}
      <Button disabled={!isConnected} onClick={handleGetBalance}>
        Get Balance
      </Button>
    </Card>
  );
}
