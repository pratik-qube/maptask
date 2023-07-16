import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

const GlobalCSS = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    height: 100vh;
  }
  #root {
    width: 100%;
    height: 100%;
  }
`;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalCSS />
    <App />
  </React.StrictMode>
);
