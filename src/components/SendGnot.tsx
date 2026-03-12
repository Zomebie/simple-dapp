import { useState } from "react";
import { useWalletStore } from "../store/useWalletStore";
import Card from "./Card";
import Button from "./Button";
import styled from "styled-components";

const Input = styled.input`
  font-size: 12px;
  padding: 11px 14px;
  border: 1px solid #d2d2d7;
  border-radius: 10px;
  outline: none;
  background: #fff;
  color: #1d1d1f;
  transition: all 0.2s ease;
  font-family: 'SF Mono', SFMono-Regular, ui-monospace, monospace;

  &::placeholder {
    color: #aeaeb2;
  }

  &:focus {
    border-color: #2c4be2;
    box-shadow: 0 0 0 3px rgba(44, 75, 226, 0.12);
  }
`;

const Label = styled.label`
  font-size: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #1d1d1f;
  font-weight: 500;
  font-size: 13px;
  letter-spacing: -0.01em;
`;

export default function SendGnot() {
  const { isConnected, addToast } = useWalletStore();
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");

  const handleSend = async () => {
    if (!window.adena) return;

    try {
      const account = await window.adena.GetAccount();
      if (account.status !== "success") return;

      const response = await window.adena.DoContract({
        messages: [
          {
            type: "/bank.MsgSend",
            value: {
              from_address: account.data.address,
              to_address: toAddress,
              amount: `${amount}ugnot`,
            },
          },
        ],
        gasFee: 1,
        gasWanted: 10000000,
      });

      if (response.status === "success") {
        addToast("success", response.data?.hash ?? null);
      } else {
        addToast("failed", response.data?.hash ?? null);
      }
    } catch {
      addToast("failed", null);
    }
  };

  return (
    <Card title="Send GNOT">
      <Label>
        To Address
        <Input
          type="text"
          placeholder="g1..."
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
        />
      </Label>
      <Label>
        Amount (ugnot)
        <Input
          type="text"
          placeholder="1000000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </Label>
      <Button disabled={!isConnected} onClick={handleSend}>
        Send
      </Button>
    </Card>
  );
}
