import cn from "@/utils/cn";
import { useEffect, useState } from "react";
import { CgClose, CgShoppingBag } from "react-icons/cg";
import Subtitle from "../../atoms/typography/Subtitle";
import CartItem from "../../atoms/extra/CartItem";
import Button from "../../atoms/buttons/Button";
import { CgMenu } from "react-icons/cg";
import type { Product } from "@/constants/static";
import Subtitle2 from "../../atoms/typography/Subtitle2";
import Image from "../../atoms/common/Image";
import { AiOutlineSearch } from "react-icons/ai";
import SearchProducts from "../SearchProducts";
import NavMenu from "../NavMenu";
import LinkButton from "../../atoms/buttons/LinkButton";

export interface UserMobileNavProps {
  searchData: Product[] | null;
  searchTerm: string;
  handleSearchTerm: () => void;
}

const UserMobileNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleNav = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (window) {
      const body = document.getElementById("body");
      if (body) {
        body.style.overflowY = isOpen ? "hidden" : "scroll";
      }
    }
  }, [isOpen]);

  return (
    <>
      <div onClick={handleNav}>
        <CgMenu size={30} />
      </div>
      <div
        className={cn(
          "z-30 fixed hidden  justify-center items-center top-0 left-0 w-screen h-screen bg-black/80",
          {
            flex: isOpen,
          }
        )}
      >
        <div className="flex flex-col  h-full w-[80%] max-w-[450px] absolute top-0 left-0 bg-white py-7 lg:py-10 px-3 lg:px-4 ">
          <span
            onClick={handleNav}
            className="absolute top-4 cursor-pointer right-5 lg:right-8"
          >
            <CgClose size={26} />
          </span>
          <div className="mt-5 flex flex-col gap-y-10">
            <SearchProducts />

            <NavMenu />

            <LinkButton
              to="/become-seller"
              className="bg-primary max-w-[200px]"
            >
              Become Seller
            </LinkButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMobileNav;
