import styled from "styled-components";

const HeaderWrapper = styled.header`
  padding: 40px 20px 32px;
  max-width: 680px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  color: #1d1d1f;
  letter-spacing: -0.03em;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #86868b;
  margin: 6px 0 0;
  font-weight: 400;
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <Title>Adena Wallet Integration</Title>
      <Subtitle>Connect and interact with Gno.land blockchain</Subtitle>
    </HeaderWrapper>
  );
}
