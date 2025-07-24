import HokageHeader from "@/components/ui/organisms/hokage/HokageHeader";
import HokageSidebar from "@/components/ui/organisms/hokage/HokageSidebar";
import React from "react";

const HokageLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

   

  return (
    <>
      <HokageHeader />
      <main className="grid grid-cols-[16%,1fr] bg-gray-bg ">
        <HokageSidebar />
        <div className="max-h-[calc(100vh-88px)] overflow-y-auto bg-white mx-5 mt-5 rounded ">
          {children}
        </div>
      </main>
    </>
  );
};

export default HokageLayout;
