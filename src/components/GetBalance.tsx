import { useState } from "react";
import { useWalletStore } from "../store/wallet";
import { getBalance } from "../services/wallet";
import Card from "./common/Card";
import Button from "./common/Button";
import InfoBox from "./common/InfoBox";
import styled from "styled-components";

const HelpText = styled.p`
  font-size: 12px;
  color: #86868b;
  margin: 0;
  line-height: 1.6;
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
      addToast({ title: "Get Balance", status: "failed", message: error instanceof Error ? error.message : "Failed to get balance" });
    }
  };

  return (
    <Card title="Get Balance">
      {balance !== null && (
        <InfoBox aria-label={`Account balance: ${balance}`}>
          {balance}
        </InfoBox>
      )}
      <HelpText>
        Balance is displayed in <strong>ugnot</strong> (micro GNOT).
        <br />
        1 GNOT = 1,000,000 ugnot
      </HelpText>
      <Button disabled={!isConnected} onClick={handleGetBalance} aria-label="Get account balance">
        Get Balance
      </Button>
    </Card>
  );
}
