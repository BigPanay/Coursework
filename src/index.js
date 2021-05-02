import React from "react";
import { hydrate } from "react-dom";
import { loadableReady } from '@loadable/component'
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import "./styles/index.scss";

loadableReady(() => {
  hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById("root")
  );
});
