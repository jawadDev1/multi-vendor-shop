"use client";
import type { ICartItem } from "@/types/common";
import CardTitle from "../../typography/CardTitle";
import Content from "../../typography/Content";
import Subtitle2 from "../../typography/Subtitle2";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { useCartStore } from "@/stores/cart-store";
import NextImage from "../../common/NextImage";

interface CartItemProps {
  item: ICartItem;
}

const CartItem = ({ item }: CartItemProps) => {
  const { image, price, qty: itemQty, title, stock } = item;
  const [qty, setQty] = useState(itemQty);

  const { addToCart, removeFromCart } = useCartStore();

  const handleCartItem = (type: "inc" | "dec") => {
    let newQty = qty;
    if (type === "inc") {
      if (qty === stock) return;
      setQty((prev) => prev + 1);
      newQty = qty + 1;
    } else {
      if (qty === 1) return;
      setQty((prev) => prev - 1);
      newQty = qty - 1;
    }

    addToCart({ ...item, qty: newQty });
  };

  const handleRemoveCartItem = () => {
    removeFromCart(item);
  };

  return (
    <div className="grid grid-cols-[10%,20%,1fr,15%] gap-x-3 w-full pt-4 lg:pt-6 border-t border-dim-gray/30">
      <div className="space-y-1 flex flex-col items-center ">
        <button
          onClick={() => handleCartItem("inc")}
          className="size-6 rounded-full outline-none bg-green-500 text-white flex items-center justify-center leading-none"
        >
          +
        </button>
        <div className="text-sm text-charcoal">{qty}</div>
        <button
          onClick={() => handleCartItem("dec")}
          className="size-6 rounded-full outline-none bg-green-500 text-white flex items-center justify-center leading-none"
        >
          -
        </button>
      </div>

      <div className="w-full h-20">
        <NextImage src={image} className="object-fill" />
      </div>

      <div className="space-y-">
        <CardTitle className="line-clamp-2">{title}</CardTitle>
        <Content>
          {price} * {qty}
        </Content>
        <Subtitle2 className="text-green-500">{price * qty}$</Subtitle2>
      </div>

      <div
        onClick={handleRemoveCartItem}
        className="flex items-center cursor-pointer"
      >
        <CgClose className="size-[18px] lg:size-[22px] text-charcoal" />
      </div>
    </div>
  );
};

export default CartItem;
