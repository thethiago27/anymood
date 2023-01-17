import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --pink500: #fb0991;
    --purple500: #aa39dfe5;
    --blue500: #3456cd;

    --color-primary: #424242;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    background: #ffffff;
    color: var(--color-primary);
  }

  @media (max-width: 1080px) {
    html {
      font-size: 93.75%;
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 87.5%;
    }
  }

  body,
  input,
  button,
  input,
  textarea,
  select,
  option {
    font: 500 1rem "Poppins", sans-serif;
    color: var(--color-primary);
  }
  
  button {
    cursor: pointer;
    font-family: "Poppins", sans-serif;
  }

  a {
    cursor: pointer;
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }
`;
