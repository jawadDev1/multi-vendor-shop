import cn from "@/utils/cn";
import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { CgMenu } from "react-icons/cg";
import SearchProducts from "../SearchProducts";
import NavMenu from "../NavMenu";
import LinkButton from "../../atoms/buttons/LinkButton";
import type { IAPIUser } from "@/types/api";

export interface UserMobileNavProps {
  user: IAPIUser | null;
  isAuthenticated: boolean;
}

const UserMobileNav = ({ user, isAuthenticated }: UserMobileNavProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
      <div className="cursor-pointer" onClick={handleNav}>
        <CgMenu size={30} color="white" />
      </div>
      <div
        className={cn(
          "z-30 fixed hidden  justify-center items-center top-0 left-0 w-screen h-screen bg-black/80",
          {
            flex: isOpen,
          }
        )}
      >
        <div className="flex flex-col  h-full w-[80%] max-w-[450px] absolute top-0 left-0 bg-charcoal py-7 lg:py-10 px-3 lg:px-4 ">
          <span
            onClick={handleNav}
            className="absolute top-4 cursor-pointer right-5 lg:right-8"
          >
            <CgClose size={26} color="white" />
          </span>
          <div className="mt-5 flex flex-col gap-y-10">
            <SearchProducts handleNav={handleNav} />

            <NavMenu />

            {isAuthenticated &&
              (user?.role === "SELLER" ? (
                <LinkButton href="/seller" className="bg-primary max-w-[200px]">
                  Shop
                </LinkButton>
              ) : (
                <LinkButton
                  href="/become-seller"
                  className="bg-primary max-w-[200px]"
                >
                  Become Seller
                </LinkButton>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMobileNav;
