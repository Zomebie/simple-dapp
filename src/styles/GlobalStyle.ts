import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.sans};
    background-color: #f5f5f7;
    color: #1d1d1f;
    line-height: 1.47059;
    letter-spacing: -0.022em;
  }
`;

export default GlobalStyle;
