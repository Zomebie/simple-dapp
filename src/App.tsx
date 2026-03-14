import styled, { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import ConnectWallet from "./components/ConnectWallet";
import GetAddress from "./components/GetAddress";
import GetBalance from "./components/GetBalance";
import SendGnot from "./components/SendGnot";
import ToastContainer from "./components/ToastContainer";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  min-height: 100vh;
  padding: 60px;
  color: #1d1d1f;
  line-height: 1.47059;
  letter-spacing: -0.022em;
`;

const Header = styled.header`
  width: 680px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  color: #1d1d1f;
  letter-spacing: -0.03em;
  text-align: center;
`;

const Main = styled.main`
  width: 680px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Page>
        <Header>
          <Title>Request to Gno.land via Adena wallet</Title>
        </Header>
        <Main>
          <ConnectWallet />
          <GetAddress />
          <GetBalance />
          <SendGnot />
        </Main>
      </Page>
      <ToastContainer />
    </ThemeProvider>
  );
}
