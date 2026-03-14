import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  html {
    font-size:16px;
  }
  
  body {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.sans};
  }
`;

export default GlobalStyle;
