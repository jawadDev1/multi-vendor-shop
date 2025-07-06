import { useAppSelector } from "@/app/hooks";
import React from "react";
import { Navigate } from "react-router";
import Loader from "../../atoms/extra/Loader";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAppSelector((state) => state.user);

  if (loading) return <Loader />;

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return <>{children}</>;
}

export default ProtectedRoute;
