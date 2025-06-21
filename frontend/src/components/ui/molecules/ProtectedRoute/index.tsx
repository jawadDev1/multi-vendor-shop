import { useAppSelector } from "@/app/hooks";
import React from "react";
import { Navigate } from "react-router";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAppSelector((state) => state.user);

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return <>{children}</>;
}

export default ProtectedRoute;
