'use client'
import cn from "@/utils/cn";
import { useEffect, useState } from "react";
import CountIconWrapper from "../../atoms/extra/CountIconWrapper";
import { AiOutlineHeart } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import Subtitle from "../../atoms/typography/Subtitle";
import WishlistItem from "../../atoms/extra/WishlistItem";
import { useCartStore } from "@/stores/cart-store";

interface WishlistProps {}

const Wishlist = ({}: WishlistProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
 const { wishlist} = useCartStore();
 

  const handleWishlist = () => {
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
      <CountIconWrapper onClick={handleWishlist} count={wishlist.length}>
        <AiOutlineHeart className="size-[22px]   lg:size-[28px] text-primary md:text-white" />
      </CountIconWrapper>
      <div
        className={cn(
          "z-30 fixed hidden  justify-center items-center top-0 left-0 w-screen h-screen bg-black/80",
          {
            flex: isOpen,
          }
        )}
      >
        <div className="flex flex-col  h-full w-full max-w-[450px] absolute top-0 right-0 bg-white py-7 lg:py-10 px-3 lg:px-4">
          <span
            onClick={handleWishlist}
            className="absolute top-1 lg:top-4 cursor-pointer right-2 lg:right-8"
          >
            <CgClose size={26} />
          </span>

          <div className="flex items-center gap-x-2">
            <AiOutlineHeart size={24} />
            <Subtitle>{wishlist.length} Items</Subtitle>
          </div>

          <div className="mt-8 space-y-3 max-h-full overflow-x-hidden overflow-y-auto px-5 lg:px-3">
            {wishlist &&
              wishlist.length > 0 &&
              wishlist.map((item) => (
                <WishlistItem item={item} key={item.id} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
