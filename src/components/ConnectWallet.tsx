import { useWalletStore } from "../store/wallet";
import { connectWallet } from "../services/wallet";
import Card from "./common/Card";
import Button from "./common/Button";
import InfoBox from "./common/InfoBox";
import styled from "styled-components";
import { useState } from "react";

const StatusDot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.success};
  margin-right: 8px;
  vertical-align: middle;
`;

export default function ConnectWallet() {
  const { isConnected, setIsConnected, addToast } = useWalletStore();
  const [address, setAddress] = useState<string>();

  const handleConnect = async () => {
    try {
      const addr = await connectWallet();
      setAddress(addr);
      setIsConnected(true);
    } catch (error) {
      console.error(error);
      addToast({
        title: "Connect Wallet",
        status: "failed",
        message: error instanceof Error ? error.message : "Failed to connect wallet",
      });
    }
  };

  return (
    <Card title="Connect Adena Wallet">
      {isConnected && address && (
        <InfoBox role="status" aria-label={`Connected wallet address: ${address}`}>
          <StatusDot aria-hidden="true" />
          {address}
        </InfoBox>
      )}
      <Button
        disabled={isConnected}
        onClick={handleConnect}
        aria-label={isConnected ? "Wallet already connected" : "Connect Adena wallet"}
      >
        Connect
      </Button>
    </Card>
  );
}
