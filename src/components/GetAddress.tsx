import { useState } from "react";
import { useWallet } from "../contexts/WalletContext";
import { Card, Button, CardContent, LoadingBar } from "./common";

export default function GetAddress() {
  const { isConnected, addToast, getAddress } = useWallet();
  const [address, setAddress] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleGetAddress = async () => {
    setLoading(true);
    try {
      const addr = await getAddress();
      setAddress(addr);
    } catch (error) {
      console.error(error);
      addToast({
        title: "Get Address",
        status: "failed",
        message: error instanceof Error ? error.message : "Failed to get address",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Get Gno.land Address">
      <Button
        disabled={!isConnected || loading}
        onClick={handleGetAddress}
        aria-label="Get Gno.land address"
      >
        Get Address
      </Button>
      {loading && <LoadingBar />}
      <CardContent aria-label={`Gno.land address: ${address}`}>
        Address: {address ?? ""}
      </CardContent>
    </Card>
  );
}
