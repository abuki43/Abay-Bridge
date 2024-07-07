import  { useContext } from "react";
import { AuthContext } from "./context-API";
import Questions from "../pages/Questions/Questions";
import { Navigate } from "react-router-dom";

const RedirectLoggedIn = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  isLoggedIn && <Navigate to="/questions"/>

  return isLoggedIn ? <Questions/> : children;
};

export default RedirectLoggedIn;
