import SellerHeader from "@/components/ui/organisms/seller/SellerHeader";
import SellerSidebar from "@/components/ui/organisms/seller/SellerSidebar";
import React from "react";

const SellerLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

   

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
