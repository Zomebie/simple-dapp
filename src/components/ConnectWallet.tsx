import { useWalletStore } from "../store/useWalletStore";
import Card from "./Card";
import Button from "./Button";
import styled from "styled-components";

const Info = styled.div`
  font-size: 16px;
  margin: 0;
  word-break: break-all;
  background: #f5f5f7;
  padding: 12px 16px;
  border-radius: 10px;
  color: #1d1d1f;
  font-family: 'SF Mono', SFMono-Regular, ui-monospace, monospace;
  font-size: 13px;
  line-height: 1.5;
`;

const StatusDot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #34c759;
  margin-right: 8px;
  vertical-align: middle;
`;

export default function ConnectWallet() {
  const { isConnected, address, connect, setAddress } = useWalletStore();

  const handleConnect = async () => {
    if (!window.adena) {
      alert("Please install Adena wallet extension.");
      return;
    }

    try {
      const response = await window.adena.AddEstablish("Adena Wallet Integration");
      if (
        response.status === "success" ||
        response.type === "ALREADY_CONNECTED"
      ) {
        const account = await window.adena.GetAccount();
        if (account.status === "success") {
          connect();
          setAddress(account.data.address);
        }
      }
    } catch {
      console.error("Failed to connect wallet");
    }
  };

  return (
    <Card title="Connect Adena Wallet">
      {isConnected && address && (
        <Info>
          <StatusDot />
          {address}
        </Info>
      )}
      <Button disabled={isConnected} onClick={handleConnect}>
        Connect
      </Button>
    </Card>
  );
}
