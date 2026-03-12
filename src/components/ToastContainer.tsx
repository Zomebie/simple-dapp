import styled, { keyframes } from "styled-components";
import { useWalletStore } from "../store/wallet";

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.96);
    filter: blur(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
`;

const Wrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
`;

const ToastItem = styled.div<{ $success: boolean }>`
  background: ${({ $success }) =>
    $success
      ? "linear-gradient(135deg, #30d158, #28bd4e)"
      : "linear-gradient(135deg, #ff453a, #e8352c)"};
  color: #fff;
  padding: 14px 18px;
  border-radius: 14px;
  font-size: 14px;
  min-width: 300px;
  max-width: 380px;
  box-shadow:
    0 4px 16px ${({ $success }) => ($success ? "rgba(48, 209, 88, 0.3)" : "rgba(255, 69, 58, 0.3)")},
    0 1px 3px rgba(0, 0, 0, 0.08);
  animation: ${slideIn} 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
`;

const Status = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
  font-size: 14px;
  letter-spacing: -0.01em;
`;

const Hash = styled.div`
  font-size: 11px;
  word-break: break-all;
  opacity: 0.85;
  font-family: "SF Mono", SFMono-Regular, ui-monospace, monospace;
  line-height: 1.4;
`;

export default function ToastContainer() {
  const { toasts } = useWalletStore();

  if (toasts.length === 0) return null;

  return (
    <Wrapper>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} $success={toast.status === "success"}>
          <Status>
            {toast.status === "success" ? "Transaction Success" : "Transaction Failed"}
          </Status>
          <Hash>txHash: {toast.message}</Hash>
        </ToastItem>
      ))}
    </Wrapper>
  );
}
