"use client";
import NextImage from "@/components/ui/atoms/common/NextImage";

import DropDownMenu from "@/components/ui/molecules/DropDownMenu";
import NavMenu from "@/components/ui/molecules/NavMenu";
import UserProfile from "@/components/ui/molecules/UserProfile";
import UserCart from "@/components/ui/molecules/UserCart";
import Wishlist from "@/components/ui/molecules/Wishlist";
import { IoIosArrowForward } from "react-icons/io";
import UserMobileMenu from "../UserMobileMenu";
import SearchProducts from "@/components/ui/molecules/SearchProducts";
import LinkButton from "@/components/ui/atoms/buttons/LinkButton";

import { useEffect } from "react";
import { useUserStore } from "@/stores/user-store";
import { useCartStore } from "@/stores/cart-store";
// import { loadCategories } from "@/features/category/categoryThunk";

const Header = () => {
  const { loadUser, isAuthenticated, user, loading } = useUserStore();
  const { initializeCartState } = useCartStore();


  useEffect(() => {
    loadUser();
    initializeCartState();
  }, []);

  return (
    <>
      <header className=" hidden md:block">
        <div className="bg-gray-50">
          <div className="max-w-[1200px] mx-auto">
            <div className=" justify-between items-center py-2 px-5 lg:px-2 grid grid-cols-[12%,1fr,10%] gap-5  ">
              <div className="w-[5rem] h-[4remk] overflow-hidden">
               <NextImage src={"/images/logo.png"} className="object-contain" />
              </div>
              <SearchProducts />
              <div>
                {isAuthenticated &&
                  (user?.role === "SELLER" ? (
                    <LinkButton
                      href="/seller"
                      className="flex items-center justify-center bg-primary text-sm lg:text-[16px] py-3"
                    >
                      Shop <IoIosArrowForward size={20} />
                    </LinkButton>
                  ) : (
                    <LinkButton
                      href="/become-seller"
                      className="flex items-center justify-center bg-primary text-sm lg:text-[16px] "
                    >
                      Become Seller <IoIosArrowForward size={20} />
                    </LinkButton>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Second Nav  */}
      <div className="bg-azure-blue sticky top-0 z-20 hidden md:block">
        <div className="h-[60px] px-5 max-w-[1200px] mx-auto  flex justify-between items-center">
          {/* {categories && categories.length > 0 && (
            <DropDownMenu categories={categories} />
          )} */}
          <NavMenu />
          <div className="flex items-center gap-x-4">
            <Wishlist />
            <UserCart />
            <UserProfile {...{ isAuthenticated, user, loading }} />
          </div>
        </div>
      </div>

      <UserMobileMenu {...{ isAuthenticated, user, loading }} />
    </>
  );
};

export default Header;
