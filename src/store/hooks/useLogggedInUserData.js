import { useContext } from "react";
import { loggedInUserIdContext } from "../loggedInUserDataProvider";

const useLoggedInUserDataProvider = () => {
  return useContext(loggedInUserIdContext);
};

export default useLoggedInUserDataProvider;
