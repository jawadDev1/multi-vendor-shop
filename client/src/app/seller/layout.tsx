"use client";
import Loader from "@/components/ui/atoms/extra/Loader";
import SellerHeader from "@/components/ui/organisms/seller/SellerHeader";
import SellerSidebar from "@/components/ui/organisms/seller/SellerSidebar";
import { useUserStore } from "@/stores/user-store";
import { notFound } from "next/navigation";
import React, { useEffect } from "react";

const SellerLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isAuthenticated, user, userLoaded, loadUser } = useUserStore();

  useEffect(() => {
    if (!user) {
      loadUser();
    }
  }, []);

  if (!userLoaded) return <Loader />;

  if (!isAuthenticated || user?.role !== "SELLER") {
    return notFound();
  }

  return (
    <>
      <SellerHeader />
      <main className="grid grid-cols-[16%,1fr] bg-gray-bg ">
        <SellerSidebar />
        <div className="max-h-[calc(100vh-88px)] overflow-y-auto bg-white mx-5 mt-5 rounded ">
          {children}
        </div>
      </main>
    </>
  );
};

export default SellerLayout;
