import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  html, body{
    width: 100%;
    height: 100%;
    background-color: #1a1a1a;
    opacity: 89%;
    /* background-color: rgb 0 0 0; */
    /* opacity: 60%; */
  }
  #root {
    width: inherit;
    height: inherit;
  }
`;

export default GlobalStyle;
