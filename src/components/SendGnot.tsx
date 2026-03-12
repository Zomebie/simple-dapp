import { useForm } from "react-hook-form";
import { useWalletStore } from "../store/wallet";
import { sendGnot } from "../services/wallet";
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
  font-family: "SF Mono", SFMono-Regular, ui-monospace, monospace;

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

interface SendFormValues {
  toAddress: string;
  amount: string;
}

export default function SendGnot() {
  const { isConnected, addToast } = useWalletStore();
  const { register, handleSubmit, reset } = useForm<SendFormValues>({
    defaultValues: {
      toAddress: "",
      amount: "",
    },
  });

  const onSubmit = async (data: SendFormValues) => {
    try {
      const result = await sendGnot(data.toAddress, data.amount);
      addToast(result.status, result.txHash);
      if (result.status === "success") {
        reset();
      }
    } catch (error) {
      console.error(error);
      addToast("failed", error instanceof Error ? error.message : "Failed to send GNOT");
    }
  };

  return (
    <Card title="Send GNOT">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label>
          To Address
          <Input type="text" placeholder="g1..." {...register("toAddress", { required: true })} />
        </Label>
        <Label>
          Amount (ugnot)
          <Input type="number" placeholder="1000000" {...register("amount", { required: true })} />
        </Label>
        <Button disabled={!isConnected}>Send</Button>
      </form>
    </Card>
  );
}
