import { useState } from "react";
import { useWalletStore } from "../store/wallet";
import { getAddress } from "../services/wallet";
import Card from "./common/Card";
import Button from "./common/Button";
import styled from "styled-components";

const Info = styled.div`
  font-size: 13px;
  margin: 0;
  word-break: break-all;
  background: #f5f5f7;
  padding: 12px 16px;
  border-radius: 10px;
  color: #1d1d1f;
  font-family: "SF Mono", SFMono-Regular, ui-monospace, monospace;
  line-height: 1.5;
`;

export default function GetAddress() {
  const { isConnected, addToast } = useWalletStore();
  const [address, setAddress] = useState<string | null>(null);

  const handleGetAddress = async () => {
    try {
      const addr = await getAddress();
      setAddress(addr);
    } catch (error) {
      console.error(error);
      addToast("failed", error instanceof Error ? error.message : "Failed to get address");
    }
  };

  return (
    <Card title="Get Gno.land Address">
      {address && (
        <Info role="status" aria-label={`Gno.land address: ${address}`}>
          {address}
        </Info>
      )}
      <Button disabled={!isConnected} onClick={handleGetAddress} aria-label="Get Gno.land address">
        Get Address
      </Button>
    </Card>
  );
}
