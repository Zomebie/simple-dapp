import { useState } from "react";
import { useWalletStore } from "../store/wallet";
import { getBalance } from "../services/wallet";
import { Card, Button, CardContent, LoadingBar } from "./common";
import styled from "styled-components";

const HelpText = styled.p`
  font-size: 12px;
  color: #86868b;
`;

export default function GetBalance() {
  const { isConnected, addToast } = useWalletStore();
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetBalance = async () => {
    setLoading(true);
    try {
      const bal = await getBalance();
      setBalance(bal);
    } catch (error) {
      console.error(error);
      addToast({
        title: "Get Balance",
        status: "failed",
        message: error instanceof Error ? error.message : "Failed to get balance",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Get Balance">
      <Button disabled={!isConnected || loading} onClick={handleGetBalance} aria-label="Get account balance">
        Get Balance
      </Button>
      {loading && <LoadingBar />}
      <CardContent aria-label={`Account balance: ${balance}`}>
        <span>Balance: {balance}</span>
        <HelpText>
          Balance is displayed in <strong>ugnot</strong> (micro GNOT).
          <br />1 GNOT = 1,000,000 ugnot
        </HelpText>
      </CardContent>
    </Card>
  );
}
