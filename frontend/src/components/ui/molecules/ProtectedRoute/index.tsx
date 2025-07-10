import { useAppSelector } from "@/app/hooks";
import React from "react";
import { Navigate } from "react-router";
import Loader from "../../atoms/extra/Loader";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, userLoaded } = useAppSelector((state) => state.user);

  if (!userLoaded) return <Loader />;

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return <>{children}</>;
}

export default ProtectedRoute;
