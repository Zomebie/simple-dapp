import { useWalletStore } from "../store/wallet";
import { connectWallet } from "../services/wallet";
import { Card, Button, CardContent, LoadingBar } from "./common";
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
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Connect Adena Wallet">
      <Button
        disabled={isConnected || loading}
        onClick={handleConnect}
        aria-label={isConnected ? "Wallet already connected" : "Connect Adena wallet"}
      >
        Connect
      </Button>
      {loading && <LoadingBar />}
      {isConnected && address && (
        <CardContent aria-label={`Connected wallet address: ${address}`}>
          <span>
            <StatusDot aria-hidden="true" />
            {address}
          </span>
        </CardContent>
      )}
    </Card>
  );
}
