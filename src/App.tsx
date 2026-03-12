import styled, { createGlobalStyle } from "styled-components";
import ConnectWallet from "./components/ConnectWallet";
import GetAddress from "./components/GetAddress";
import GetBalance from "./components/GetBalance";
import SendGnot from "./components/SendGnot";
import ToastContainer from "./components/ToastContainer";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text',
      'Helvetica Neue', Helvetica, Arial, sans-serif;
    background-color: #f5f5f7;
    color: #1d1d1f;
    line-height: 1.47059;
    letter-spacing: -0.022em;
  }
`;

const Page = styled.div`
  min-height: 100vh;
  padding-bottom: 60px;
`;

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

const Container = styled.div`
  max-width: 680px;
  margin: 0 auto;
  padding: 0 20px;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Page>
        <HeaderWrapper>
          <Title>Adena Wallet Integration</Title>
          <Subtitle>Connect and interact with Gno.land blockchain</Subtitle>
        </HeaderWrapper>
        <Container>
          <CardList>
            <ConnectWallet />
            <GetAddress />
            <GetBalance />
            <SendGnot />
          </CardList>
        </Container>
      </Page>
      <ToastContainer />
    </>
  );
}
