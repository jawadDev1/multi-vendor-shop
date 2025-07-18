import React from "react";
import Loader from "../../atoms/extra/Loader";
import { useUserStore } from "@/stores/user-store";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, userLoaded } = useUserStore(); 

  if (!userLoaded) return <Loader />;

  // if (!isAuthenticated) return <Navigate href={"/login"} />;

  return <>{children}</>;
}

export default ProtectedRoute;
