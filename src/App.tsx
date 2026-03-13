import styled, { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import ConnectWallet from "./components/ConnectWallet";
import GetAddress from "./components/GetAddress";
import GetBalance from "./components/GetBalance";
import SendGnot from "./components/SendGnot";
import ToastContainer from "./components/ToastContainer";

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
  font-size: ${({ theme }) => theme.fontSizes.header};
  font-weight: 700;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.03em;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 6px 0 0;
  font-weight: 400;
`;

const Main = styled.main`
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
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Page>
        <HeaderWrapper>
          <Title>Adena Wallet Integration</Title>
          <Subtitle>Connect and interact with Gno.land blockchain</Subtitle>
        </HeaderWrapper>
        <Main>
          <CardList>
            <ConnectWallet />
            <GetAddress />
            <GetBalance />
            <SendGnot />
          </CardList>
        </Main>
      </Page>
      <ToastContainer />
    </ThemeProvider>
  );
}
