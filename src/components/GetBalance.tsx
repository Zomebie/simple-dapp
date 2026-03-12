import { useState } from "react";
import { useWalletStore } from "../store/useWalletStore";
import { getBalance } from "../services/walletService";
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
  font-family: 'SF Mono', SFMono-Regular, ui-monospace, monospace;
  line-height: 1.5;
`;

export default function GetBalance() {
  const { isConnected } = useWalletStore();
  const [balance, setBalance] = useState<string | null>(null);

  const handleGetBalance = async () => {
    try {
      setBalance(await getBalance());
    } catch {
      console.error("Failed to get balance");
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
