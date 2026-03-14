import styled, { keyframes } from "styled-components";

const slide = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const Track = styled.div`
  width: 100%;
  height: 3px;
  background: #f0f0f0;
  border-radius: 2px;
  overflow: hidden;
`;

const Bar = styled.div`
  width: 50%;
  height: 100%;
  background: ${({ theme }) => theme.colors.active};
  border-radius: 2px;
  animation: ${slide} 1.2s ease-in-out infinite;
`;

export default function LoadingBar() {
  return (
    <Track role="progressbar" aria-label="Loading">
      <Bar />
    </Track>
  );
}
