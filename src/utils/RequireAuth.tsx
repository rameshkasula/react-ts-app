import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    console.log("Redirecting...");
    return <Navigate to="/signin" />;
  }

  return <>{children}</>;
};

export default RequireAuth;
