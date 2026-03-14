import { useState } from "react";
import { useWalletStore } from "../store/wallet";
import { getAddress } from "../services/wallet";
import { Card, Button, InfoBox } from "./common";

export default function GetAddress() {
  const { isConnected, addToast } = useWalletStore();
  const [address, setAddress] = useState<string | null>(null);

  const handleGetAddress = async () => {
    try {
      const addr = await getAddress();
      setAddress(addr);
    } catch (error) {
      console.error(error);
      addToast({ title: "Get Address", status: "failed", message: error instanceof Error ? error.message : "Failed to get address" });
    }
  };

  return (
    <Card title="Get Gno.land Address">
      {address && (
        <InfoBox aria-label={`Gno.land address: ${address}`}>
          {address}
        </InfoBox>
      )}
      <Button disabled={!isConnected} onClick={handleGetAddress} aria-label="Get Gno.land address">
        Get Address
      </Button>
    </Card>
  );
}
