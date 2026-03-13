import styled from "styled-components";

const StyledButton = styled.button`
  font-size: ${({ theme }) => theme.fontSizes.button};
  font-weight: 500;
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.primary};
  transition: all 0.2s ease;
  letter-spacing: -0.01em;
  position: relative;
  overflow: hidden;

  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.disabled};
  }

  &:not(:disabled):hover {
    transform: scale(1.01);
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:not(:disabled):active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

interface ButtonProps extends Readonly<{
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
}> {}

export default function Button({
  children,
  disabled = false,
  onClick,
  type = "button",
  "aria-label": ariaLabel,
}: ButtonProps) {
  return (
    <StyledButton
      disabled={disabled}
      onClick={onClick}
      type={type}
      aria-label={ariaLabel}
    >
      {children}
    </StyledButton>
  );
}
