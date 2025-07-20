'use client';
import cn from "@/utils/cn";
import { useEffect, useState } from "react";
import CountIconWrapper from "../../atoms/extra/CountIconWrapper";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CgClose, CgShoppingBag } from "react-icons/cg";
import Subtitle from "../../atoms/typography/Subtitle";
import CartItem from "../../atoms/extra/CartItem";
import Button from "../../atoms/buttons/Button";
import LinkButton from "../../atoms/buttons/LinkButton";
import { useCartStore } from "@/stores/cart-store";

interface UserCartProps {}

const UserCart = ({}: UserCartProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
const { totalAmount, cart} = useCartStore();


  const handleCart = () => {
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
      <CountIconWrapper onClick={handleCart} count={cart?.length ?? 0}>
        <AiOutlineShoppingCart className="size-[22px]   lg:size-[28px] text-white" />
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
            onClick={handleCart}
            className="absolute top-4 cursor-pointer right-5 lg:right-8"
          >
            <CgClose size={26} />
          </span>

          <div className="flex items-center gap-x-2">
            <CgShoppingBag size={24} />
            <Subtitle> {cart.length} Items</Subtitle>
          </div>

          <div className="mt-8 space-y-3 max-h-full overflow-x-hidden overflow-y-auto ">
            {cart &&
              cart.length > 0 &&
              cart.map((item) => <CartItem key={item.id} item={item} />)}
          </div>

          {cart.length > 0 && (
            <div className="mt-auto">
              <LinkButton
                onClick={handleCart}
                href="/checkout"
                className="bg-green-500"
              >
                Check out Now (${totalAmount})
              </LinkButton>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserCart;
