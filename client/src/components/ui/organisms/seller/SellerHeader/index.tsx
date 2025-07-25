"use client";
import NextImage from "@/components/ui/atoms/common/NextImage";
import SellerHeaderSkeleton from "@/components/ui/atoms/skelatons/SellerHeaderSkelaton";
import ConnectStripe from "@/components/ui/molecules/ConnectStripe";
import { useShopStore } from "@/stores/shop-store";
import { useUserStore } from "@/stores/user-store";
import { notifyError } from "@/utils/toast";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect } from "react";

const logo = "/images/logo.png";

const SellerHeader = () => {
  const { shop, error, loadShop } = useShopStore();

  const { isAuthenticated, user, userLoaded, loadUser } = useUserStore();

  useEffect(() => {
    if (!user) {
      loadUser();
    }
    if (user) loadShop();
    if (error) {
      notifyError(error);
    }
  }, [user?.name]);

  if (!userLoaded) return <SellerHeaderSkeleton />;

  if ((userLoaded && !isAuthenticated) || user?.role !== "SELLER") {
    return notFound();
  }

  return (
    <header className="bg-blue-gray py-3 px-4 flex justify-between items-center shadow-2xl z-10 relative">
      <Link href={"/"} className=" w-[4rem] overflow-hidden">
        <NextImage src={logo} className="object-cover" />
      </Link>

      <div className="flex gap-3 items-center">
        {shop && shop.stripe_payment?.status !== "ACTIVATED" && (
          <ConnectStripe />
        )}
        {shop && (
          <Link
            className=" size-[30px] shrink-0 lg:size-[50px] rounded-full overflow-hidden"
            href={`/shop/${shop.slug}`}
          >
            <NextImage src={shop.logo} />
          </Link>
        )}
      </div>
    </header>
  );
};



export default SellerHeader;
