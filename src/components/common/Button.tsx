import styled from "styled-components";

const StyledButton = styled.button<{ $disabled: boolean }>`
  font-size: 16px;
  font-weight: 500;
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  color: #fff;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  background-color: ${({ $disabled }) => ($disabled ? "#808080" : "#2c4be2")};
  transition: all 0.2s ease;
  letter-spacing: -0.01em;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: ${({ $disabled }) => ($disabled ? "none" : "scale(1.01)")};
    background-color: ${({ $disabled }) => ($disabled ? "#808080" : "#2440c8")};
  }

  &:active {
    transform: ${({ $disabled }) => ($disabled ? "none" : "scale(0.98)")};
  }

  &:focus-visible {
    outline: 2px solid #2c4be2;
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
      $disabled={disabled}
      disabled={disabled}
      onClick={onClick}
      type={type}
      aria-label={ariaLabel}
    >
      {children}
    </StyledButton>
  );
}
