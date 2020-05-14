import React, { createContext, useState } from "react";

const loggedInUserIdDetails = localStorage.getItem("userId");

export const loggedInUserIdContext = createContext(loggedInUserIdDetails);
const { Provider } = loggedInUserIdContext;

const LoggedInUserDataProvider = ({ children }) => {
  const [loggedInUserId, setLoggedInUserId] = useState(loggedInUserIdDetails);

  const loggedInUserIdFunction = data => {
    setLoggedInUserId(data);
  };

  return (
    <Provider
      value={{
        loggedInUserId,
        loggedInUserIdFunction
      }}
    >
      {" "}
      {children}{" "}
    </Provider>
  );
};

export default LoggedInUserDataProvider;
