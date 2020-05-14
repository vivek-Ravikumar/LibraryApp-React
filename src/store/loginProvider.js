import React, { createContext, useState } from "react";

const loggedIn = localStorage.getItem("jwt") ? true : false;

export const loggedInContext = createContext(loggedIn);

const { Provider } = loggedInContext;

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setLogIn] = useState(loggedIn);

  const loginFunction = () => {
    if (localStorage.getItem("jwt")) {
      setLogIn(true);
    } else setLogIn(false);
  };

  return (
    <Provider
      value={{
        isLoggedIn,
        loginFunction
      }}
    >
      {" "}
      {children}{" "}
    </Provider>
  );
};

export default LoginProvider;
