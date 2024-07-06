import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../utils/context-API";

const RedirectLoggedIn = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? <Navigate to="/questions" /> : children;
};

export default RedirectLoggedIn;
