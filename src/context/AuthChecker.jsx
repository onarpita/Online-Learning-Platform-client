import React, { use } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, useLocation } from "react-router";
import Loading from "../components/Loading";

const AuthChecker = ({ children }) => {
  const location = useLocation();
  console.log(location);
  const { user, loading } = use(AuthContext);
  if (loading) {
    return <Loading></Loading>;
  }
  if (user && user.email) {
    return <Navigate to={location.state ? location.state : "/"}></Navigate>;
  }
  return children;
};

export default AuthChecker;