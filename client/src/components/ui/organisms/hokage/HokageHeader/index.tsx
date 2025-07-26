"use client";
import NextImage from "@/components/ui/atoms/common/NextImage";
import SellerHeaderSkeleton from "@/components/ui/atoms/skelatons/SellerHeaderSkelaton";
import { useUserStore } from "@/stores/user-store";
import Link from "next/link";
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

  if (!userLoaded) return <SellerHeaderSkeleton />;

  if ((userLoaded && !isAuthenticated) || user?.role !== "ADMIN") {
    return notFound();
  }

  return (
    <header className="bg-blue-gray py-3 px-4 flex justify-between items-center shadow-2xl z-10 relative">
      <Link href={"/"} className=" w-[4rem] overflow-hidden">
        <NextImage src={logo} className="object-cover" />
      </Link>
    </header>
  );
};

export default HokageHeader;
