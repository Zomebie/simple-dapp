import { useState } from "react";
import { useWalletStore } from "../store/useWalletStore";
import Card from "./Card";
import Button from "./Button";
import styled from "styled-components";

const Info = styled.div`
  font-size: 13px;
  margin: 0;
  word-break: break-all;
  background: #f5f5f7;
  padding: 12px 16px;
  border-radius: 10px;
  color: #1d1d1f;
  font-family: 'SF Mono', SFMono-Regular, ui-monospace, monospace;
  line-height: 1.5;
`;

export default function GetAddress() {
  const { isConnected } = useWalletStore();
  const [address, setAddress] = useState<string | null>(null);

  const handleGetAddress = async () => {
    if (!window.adena) return;

    try {
      const account = await window.adena.GetAccount();
      if (account.status === "success") {
        setAddress(account.data.address);
      }
    } catch {
      console.error("Failed to get address");
    }
  };

  return (
    <Card title="Get Gno.land Address">
      {address && <Info>{address}</Info>}
      <Button disabled={!isConnected} onClick={handleGetAddress}>
        Get Address
      </Button>
    </Card>
  );
}
