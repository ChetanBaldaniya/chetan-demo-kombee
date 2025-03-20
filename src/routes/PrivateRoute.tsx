import  { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import LayoutMain from "../layout/LayoutMain";
import { useAuth } from "../hooks/useAuth";

type RoutesType = {
    children : ReactNode;
}
const PrivateRoute = ({ children }:RoutesType) => {
  const isAuthenticated = useAuth();

  return isAuthenticated ? (
    <LayoutMain>{children}</LayoutMain>
  ) : (
    <Navigate to="/" replace />
  );

};

export default PrivateRoute;
