import styled from "styled-components";

const InfoBox = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.infoBox};
  margin: 0;
  word-break: break-all;
  background: ${({ theme }) => theme.colors.background};
  padding: 12px 16px;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.mono};
  line-height: 1.5;
`;

export default InfoBox;
