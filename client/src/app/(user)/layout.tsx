import Footer from "@/components/ui/organisms/common/Footer";
import Header from "@/components/ui/organisms/common/Header";
import React from "react";

const UserLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default UserLayout;
