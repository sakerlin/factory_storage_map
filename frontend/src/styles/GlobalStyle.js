import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('/legacy/style.css');
  @import url('/legacy/css/reset.css');
  @import url('/legacy/css/jquery-ui-1.8.1.custom.css');

  :root {
    color-scheme: light;
    font-family: 'Segoe UI', sans-serif;
    background: #f4f5f7;
    color: #16181d;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-width: 320px;
    background: #eef1f6;
    color: #16181d;
    font-family: 'Segoe UI', sans-serif;
  }

  a {
    color: inherit;
  }

  button,
  input,
  select {
    font: inherit;
  }

  #root {
    min-height: 100vh;
  }
`;

export default GlobalStyle;
