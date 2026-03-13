import { useId } from "react";
import { useForm } from "react-hook-form";
import { useWalletStore } from "../store/wallet";
import { sendGnot } from "../services/wallet";
import Card from "./common/Card";
import Button from "./common/Button";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FieldGroup = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 6px;
  border: none;
  margin: 0;
  padding: 0;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: -0.01em;
`;

const InputWrapper = styled.div<{ $hasError?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  border: 1.5px solid ${({ $hasError, theme }) => ($hasError ? theme.colors.error : "transparent")};
  border-radius: 12px;
  transition: all 0.2s ease;

  &:focus-within {
    background: ${({ theme }) => theme.colors.surface};
    border-color: ${({ $hasError, theme }) => ($hasError ? theme.colors.error : theme.colors.primary)};
    box-shadow: ${({ $hasError, theme }) => ($hasError ? theme.shadows.focusError : theme.shadows.focusPrimary)};
  }
`;

const Input = styled.input`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.input};
  padding: 12px 14px;
  border: none;
  border-radius: 12px;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.mono};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textPlaceholder};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Suffix = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding-right: 14px;
  font-weight: 500;
  white-space: nowrap;
`;

const ErrorText = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.error};
  margin-top: 2px;
`;

interface SendFormValues {
  toAddress: string;
  amount: string;
}

export default function SendGnot() {
  const { isConnected, addToast } = useWalletStore();
  const id = useId();
  const addressId = `${id}-address`;
  const amountId = `${id}-amount`;
  const addressErrorId = `${id}-address-error`;
  const amountErrorId = `${id}-amount-error`;

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
      if (result.status !== "success") throw new Error("Failed to send GNOT");

      addToast({
        title: "Transaction Success",
        status: result.status,
        message: "txHash: " + (result.txHash ?? "-"),
      });
      if (result.status === "success") {
        reset();
      }
    } catch (error) {
      console.error(error);
      addToast({
        title: "Transaction Failed",
        status: "failed",
        message: error instanceof Error ? error.message : "Failed to send GNOT",
      });
    }
  };

  return (
    <Card title="Send GNOT">
      <Form onSubmit={handleSubmit(onSubmit)} aria-label="Send GNOT form" noValidate>
        <FieldGroup>
          <Label htmlFor={addressId}>To Address</Label>
          <InputWrapper $hasError={!!errors.toAddress}>
            <Input
              id={addressId}
              type="text"
              placeholder="g1..."
              autoComplete="off"
              aria-invalid={!!errors.toAddress}
              aria-describedby={errors.toAddress ? addressErrorId : undefined}
              {...register("toAddress", {
                required: "Address is required",
                pattern: {
                  value: /^g1[a-z0-9]{38}$/,
                  message: "Invalid Gno.land address format (g1 + 38 characters)",
                },
              })}
            />
          </InputWrapper>
          {errors.toAddress && (
            <ErrorText id={addressErrorId} role="alert">
              {errors.toAddress.message}
            </ErrorText>
          )}
        </FieldGroup>

        <FieldGroup>
          <Label htmlFor={amountId}>Amount</Label>
          <InputWrapper $hasError={!!errors.amount}>
            <Input
              id={amountId}
              type="number"
              placeholder="1000000"
              autoComplete="off"
              aria-invalid={!!errors.amount}
              aria-describedby={errors.amount ? amountErrorId : undefined}
              {...register("amount", {
                required: "Amount is required",
                validate: {
                  positive: (v) => Number(v) > 0 || "Must be greater than 0",
                  integer: (v) => Number.isInteger(Number(v)) || "Must be a whole number",
                  // maxAmount: (v) => Number(v) <= 1_000_000_000 || "Exceeds maximum amount",
                },
              })}
            />
            <Suffix aria-hidden="true">ugnot</Suffix>
          </InputWrapper>
          {errors.amount && (
            <ErrorText id={amountErrorId} role="alert">
              {errors.amount.message}
            </ErrorText>
          )}
        </FieldGroup>

        <Button disabled={!isConnected || isSubmitting} type="submit">
          {isSubmitting ? "Sending..." : "Send"}
        </Button>
      </Form>
    </Card>
  );
}
