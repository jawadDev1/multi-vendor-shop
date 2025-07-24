"use client";
import NextImage from "@/components/ui/atoms/common/NextImage";
import { useUserStore } from "@/stores/user-store";
import { notFound } from "next/navigation";
import { useEffect } from "react";

const logo = "/images/logo.png";

const HokageHeader = () => {
  const { isAuthenticated, user, userLoaded, loadUser } = useUserStore();

  useEffect(() => {
    if (!user) {
      loadUser();
    }
  }, []);

  if (!userLoaded) return null;

  if ((userLoaded && !isAuthenticated) || user?.role !== "ADMIN") {
    return notFound();
  }

  return (
    <header className="bg-blue-gray py-3 px-4 flex justify-between items-center shadow-2xl z-10 relative">
      <div className=" w-[4rem] overflow-hidden">
        <NextImage src={logo} className="object-cover" />
      </div>
    </header>
  );
};

export default HokageHeader;
