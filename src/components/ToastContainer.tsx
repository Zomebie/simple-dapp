import { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useWalletStore } from "../store/wallet";

const TOAST_DURATION = 3000;

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
  background: ${({ $success, theme }) =>
    $success
      ? `linear-gradient(135deg, ${theme.colors.success}, #28bd4e)`
      : `linear-gradient(135deg, ${theme.colors.error}, #e8352c)`};
  color: #ffffff;
  padding: 14px 18px;
  border-radius: 14px;
  font-size: 14px;
  width: 380px;
  max-width: calc(100vw - 40px);
  box-shadow: ${({ $success }) =>
    $success
      ? "0 4px 16px rgba(48, 209, 88, 0.3), 0 1px 3px rgba(0, 0, 0, 0.08)"
      : "0 4px 16px rgba(255, 69, 58, 0.3), 0 1px 3px rgba(0, 0, 0, 0.08)"};
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

const Message = styled.div`
  font-size: 11px;
  word-break: break-all;
  opacity: 0.85;
  font-family: "SF Mono", SFMono-Regular, ui-monospace, monospace;
  line-height: 1.4;
`;

export default function ToastContainer() {
  const { toasts, removeToast } = useWalletStore();
  const timersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  useEffect(
    function scheduleRemoval() {
      toasts.forEach((toast) => {
        if (timersRef.current.has(toast.id)) return;

        const timer = setTimeout(() => {
          removeToast(toast.id);
          timersRef.current.delete(toast.id);
        }, TOAST_DURATION);

        timersRef.current.set(toast.id, timer);
      });
    },
    [toasts, removeToast],
  );

  useEffect(function clearTimers() {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <Wrapper role="region" aria-label="Notifications" aria-live="polite">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} $success={toast.status === "success"} role="alert">
          <Status>{toast.title}</Status>
          <Message>{toast.message}</Message>
        </ToastItem>
      ))}
    </Wrapper>
  );
}
