import { useForm } from "react-hook-form";
import { useWalletStore } from "../store/wallet";
import { sendGnot } from "../services/wallet";
import Card from "./Card";
import Button from "./Button";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const LabelText = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #86868b;
  letter-spacing: -0.01em;
`;

const focusShadow = (hasError?: boolean) =>
  hasError ? "0 0 0 3px rgba(255, 69, 58, 0.12)" : "0 0 0 3px rgba(44, 75, 226, 0.1)";

const InputWrapper = styled.div<{ $hasError?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  background: #f5f5f7;
  border: 1.5px solid ${({ $hasError }) => ($hasError ? "#ff453a" : "transparent")};
  border-radius: 12px;
  transition: all 0.2s ease;

  &:focus-within {
    background: #fff;
    border-color: ${({ $hasError }) => ($hasError ? "#ff453a" : "#2c4be2")};
    box-shadow: ${({ $hasError }) => focusShadow($hasError)};
  }
`;

const Input = styled.input`
  width: 100%;
  font-size: 14px;
  padding: 12px 14px;
  border: none;
  border-radius: 12px;
  outline: none;
  background: transparent;
  color: #1d1d1f;
  font-family: "SF Mono", SFMono-Regular, ui-monospace, monospace;

  &::placeholder {
    color: #aeaeb2;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Suffix = styled.span`
  font-size: 12px;
  color: #86868b;
  padding-right: 14px;
  font-weight: 500;
  white-space: nowrap;
`;

const ErrorText = styled.span`
  font-size: 11px;
  color: #ff453a;
  margin-top: 2px;
`;

interface SendFormValues {
  toAddress: string;
  amount: string;
}

export default function SendGnot() {
  const { isConnected, addToast } = useWalletStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SendFormValues>({
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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <LabelText>To Address</LabelText>
          <InputWrapper $hasError={!!errors.toAddress}>
            <Input
              type="text"
              placeholder="g1..."
              {...register("toAddress", {
                required: "Address is required",
                pattern: {
                  value: /^g1[a-z0-9]{38}$/,
                  message: "Invalid Gno.land address format (g1 + 38 characters)",
                },
              })}
            />
          </InputWrapper>
          {errors.toAddress && <ErrorText>{errors.toAddress.message}</ErrorText>}
        </FieldGroup>

        <FieldGroup>
          <LabelText>Amount</LabelText>
          <InputWrapper $hasError={!!errors.amount}>
            <Input
              type="number"
              placeholder="1000000"
              {...register("amount", {
                required: "Amount is required",
                validate: {
                  positive: (v) => Number(v) > 0 || "Must be greater than 0",
                  integer: (v) => Number.isInteger(Number(v)) || "Must be a whole number",
                  // maxAmount: (v) => Number(v) <= 1_000_000_000 || "Exceeds maximum amount",
                },
              })}
            />
            <Suffix>ugnot</Suffix>
          </InputWrapper>
          {errors.amount && <ErrorText>{errors.amount.message}</ErrorText>}
        </FieldGroup>

        <Button disabled={!isConnected || isSubmitting}>
          {isSubmitting ? "Sending..." : "Send"}
        </Button>
      </Form>
    </Card>
  );
}
