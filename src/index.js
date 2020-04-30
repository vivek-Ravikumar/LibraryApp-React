import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import LoginProvider from "./store/loginProvider";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <LoginProvider>
      <Router>
        <App />
      </Router>
    </LoginProvider>
  </React.StrictMode>,
  rootElement
);
