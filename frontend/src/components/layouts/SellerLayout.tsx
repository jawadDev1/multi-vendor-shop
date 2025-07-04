import { Toaster } from "sonner";
import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "@/app/hooks";

import SellerSidebar from "../ui/organisms/seller/SellerSidebar";
import Loader from "../ui/atoms/extra/Loader";
import SellerHeader from "../ui/organisms/seller/SellerHeader";

const ShopLayout = () => {
  const { isAuthenticated, user, loading } = useAppSelector(
    (state) => state.user
  );

  if (loading) return <Loader />;

  if (!isAuthenticated && user?.role !== "SELLER") {
    <Navigate to={"/login"} />;
  }

  return (
    <>
      <Toaster closeButton={true} richColors={true} position="top-right" />
      <SellerHeader />
      <main className="grid grid-cols-[16%,1fr]">
        <SellerSidebar />
        <div className="max-h-[calc(100vh-88px)] overflow-y-auto">
        <Outlet />
        </div>
      </main>
    </>
  );
};

export default ShopLayout;
