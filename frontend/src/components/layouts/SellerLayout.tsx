import { Toaster } from "sonner";
import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "@/app/hooks";

import SellerSidebar from "../ui/organisms/seller/SellerSidebar";
import Loader from "../ui/atoms/extra/OrderSuccess";
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
      <main className="grid grid-cols-[16%,1fr] bg-gray-bg">
        <SellerSidebar />
        <div className="max-h-[calc(100vh-88px)] overflow-y-auto py-5 md:py-11 px-5 md:px-7">
        <Outlet />
        </div>
      </main>
    </>
  );
};

export default ShopLayout;
