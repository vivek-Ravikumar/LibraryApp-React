import React, { createContext, useState } from "react";

const loggedIn = false;

export const loggedInContext = createContext(loggedIn);

const { Provider } = loggedInContext;

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setLogIn] = useState(loggedIn);

  const loginFunction = data => {
    setLogIn(data);
  };

  return (
    <Provider value={{ isLoggedIn, loginFunction }}> {children} </Provider>
  );
};

export default LoginProvider;
