import { Toaster } from "sonner";
import { Navigate, Outlet } from "react-router";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import SellerSidebar from "../ui/organisms/seller/SellerSidebar";
import SellerHeader from "../ui/organisms/seller/SellerHeader";
import { useEffect } from "react";
import { loadUser } from "@/features/user/userThunks";
import Loader from "../ui/atoms/extra/Loader";

const ShopLayout = () => {
  const { isAuthenticated, user, userLoaded } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    }
  }, []);

  if (!userLoaded) return <Loader />;

  if (!isAuthenticated || user?.role !== "SELLER") {
    return <Navigate href={"/login"} />;
  }

  return (
    <>
      <Toaster closeButton={true} richColors={true} position="top-right" />
      <SellerHeader />
      <main className="grid grid-cols-[16%,1fr] bg-gray-bg ">
        <SellerSidebar />
        <div className="max-h-[calc(100vh-88px)] overflow-y-auto bg-white mx-5 mt-5 rounded ">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default ShopLayout;
