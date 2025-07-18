'use client';
import NextImage from "@/components/ui/atoms/common/NextImage";
import { useShopStore } from "@/stores/shop-store";
import { notifyError } from "@/utils/toast";
import Link from "next/link";
import { useEffect } from "react";
import { AiOutlineGift } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import { CgShoppingBag, CgTag } from "react-icons/cg";
import { FiPackage } from "react-icons/fi";

const logo = '/images/logo.png'

const SellerHeader = () => {
  const { shop, error, loadShop } = useShopStore(); 

  useEffect(() => {
    (loadShop());
    if (error) {
      notifyError(error);
    }
  }, []);

  return (
    <header className="bg-white py-3 px-4 flex justify-between items-center shadow-md z-10 relative">
      <div className=" w-[5rem] lg:w-[5rem] overflow-hidden">
       <NextImage src={logo} className="object-cover" />
      </div>

      <div className="flex items-center gap-x-5">
        <Link href={"/shop/coupouns"} className="hidden md:block">
          <AiOutlineGift className="size-8 text-[#555] hover:text-azure-blue cursor-pointer" />
        </Link>
        <Link href={"/shop/events"} className="hidden md:block">
          <CgTag className="size-8 text-[#555] hover:text-azure-blue cursor-pointer rotate-[223deg]" />
        </Link>
        <Link href={"/shop/products"} className="hidden md:block">
          <CgShoppingBag className="size-8 text-[#555] hover:text-azure-blue cursor-pointer" />
        </Link>
        <Link href={"/shop/orders"} className="hidden md:block">
          <FiPackage className="size-8 text-[#555] hover:text-azure-blue cursor-pointer" />
        </Link>
        <Link href={"/shop/inbox"} className="hidden md:block">
          <BiMessageSquareDetail className="size-8 text-[#555] hover:text-azure-blue cursor-pointer" />
        </Link>
        {shop && (
          <Link
            className=" size-[26px] lg:size-[34px] rounded-full overflow-hidden"
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
