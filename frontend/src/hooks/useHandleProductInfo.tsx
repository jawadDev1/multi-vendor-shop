import { useAppDispatch } from "@/app/hooks";
import { addToCart } from "@/features/cart/cartSlice";
import type { IAPIUserProduct } from "@/types/api";
import type { ICartItem } from "@/types/common";
import { calculatePriceAfterDiscount } from "@/utils";
import { notifySuccess } from "@/utils/toast";
import React, { useState } from "react";

interface UseHandleProductInfoProps {
  item: IAPIUserProduct;
}

const useHandleProductInfo = ({ item }: UseHandleProductInfoProps) => {
  const [qty, setQty] = useState<number>(1);
  const { originalPrice, discount, stock, _id: id, title, images } = item;
  const price = discount
    ? calculatePriceAfterDiscount(originalPrice, discount)
    : originalPrice;
  const dispatch = useAppDispatch();

  const handleQty = (type: "inc" | "dec") => {
    if (type == "inc") {
      if (qty === stock) return;
      setQty((prev) => prev + 1);
    } else {
      if (qty === 1) return;
      setQty((prev) => prev - 1);
    }
  };

  const handleAddCart = () => {
    const item: ICartItem = {
      id,
      stock,
      title,
      qty,
      discount: discount ?? 0,
      image: images[0],
      price: Number(price),
    };
    dispatch(addToCart(item));

    notifySuccess("Product added to cart successfully");
  };

  return { handleAddCart, handleQty, price, qty };
};

export default useHandleProductInfo;
