import { useAppDispatch, useAppSelector } from "@/app/hooks";
import logo from "@/assets/logo2.png";
import Image from "@/components/ui/atoms/common/Image";

import { loadShop } from "@/features/shop/shopThunk";
import { notifyError } from "@/utils/toast";
import { useEffect } from "react";
import { AiOutlineGift } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import { CgShoppingBag, CgTag } from "react-icons/cg";
import { FiPackage } from "react-icons/fi";
import { Link } from "react-router";

const SellerHeader = () => {
  const dispatch = useAppDispatch();
  const { shop, error } = useAppSelector((state) => state.shop);

  useEffect(() => {
    dispatch(loadShop());
    if (error) {
      notifyError(error);
    }
  }, []);

  return (
    <header className="bg-gray-100/70 py-3 px-4 flex justify-between items-center shadow">
      <div className=" w-[5rem] h-[3rem] lg:w-[9rem] lg:h-[4rem] overflow-hidden">
        <Image src={logo} className="object-cover" />
      </div>

      <div className="flex items-center gap-x-5">
        <Link to={"/shop/coupouns"} className="hidden md:block">
          <AiOutlineGift className="size-8 text-[#555] hover:text-azure-blue cursor-pointer" />
        </Link>
        <Link to={"/shop/events"} className="hidden md:block">
          <CgTag className="size-8 text-[#555] hover:text-azure-blue cursor-pointer rotate-[223deg]" />
        </Link>
        <Link to={"/shop/products"} className="hidden md:block">
          <CgShoppingBag className="size-8 text-[#555] hover:text-azure-blue cursor-pointer" />
        </Link>
        <Link to={"/shop/orders"} className="hidden md:block">
          <FiPackage className="size-8 text-[#555] hover:text-azure-blue cursor-pointer" />
        </Link>
        <Link to={"/shop/inbox"} className="hidden md:block">
          <BiMessageSquareDetail className="size-8 text-[#555] hover:text-azure-blue cursor-pointer" />
        </Link>
        {shop && (
          <Link
            className=" size-[26px] lg:size-[34px] rounded-full overflow-hidden"
            to={"/shop/slug"}
          >
            <Image src={shop.logo} />
          </Link>
        )}
      </div>
    </header>
  );
};

export default SellerHeader;
