import { useContext } from "react";
import { loggedInContext } from "../loginProvider";

const useLoginProvider = () => {
  return useContext(loggedInContext);
};

export default useLoginProvider;
