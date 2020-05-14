import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import LoginProvider from "./store/loginProvider";
import LoggedInUserDataProvider from "./store/loggedInUserDataProvider";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <LoggedInUserDataProvider>
      <LoginProvider>
        <Router>
          <App />
        </Router>
      </LoginProvider>
    </LoggedInUserDataProvider>
  </React.StrictMode>,
  rootElement
);
