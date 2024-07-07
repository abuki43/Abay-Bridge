import  { useContext } from "react";

import { AuthContext } from "./context-API";
import Questions from "../pages/Questions/Questions";
const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);


  return isLoggedIn ? children : "";
};

export default PrivateRoute;
