import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  html, body{
    width: 100%;
    height: 100%;
    background-color: black;
    /* background-color: #1a1a1a; */
    opacity: 87%;
  }
  #root {
    width: inherit;
    height: inherit;
  }
`;

export default GlobalStyle;
