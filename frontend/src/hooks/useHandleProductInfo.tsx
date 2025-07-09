import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { addToCart, toggleWishlist } from "@/features/cart/cartSlice";
import type { IAPIUserProduct } from "@/types/api";
import type { ICartItem, IWishlistItem } from "@/types/common";
import { calculatePriceAfterDiscount } from "@/utils";
import { notifySuccess } from "@/utils/toast";
import { useEffect, useState } from "react";

interface UseHandleProductInfoProps {
  item: IAPIUserProduct;
}

const useHandleProductInfo = ({ item }: UseHandleProductInfoProps) => {
  const [qty, setQty] = useState<number>(1);
  const [wishlistExists, setWishlistExists] = useState<boolean>(false);
  const { originalPrice, discount, stock, _id: id, title, images, shop } = item;

  const dispatch = useAppDispatch();
  const { wishlist } = useAppSelector((state) => state.cart);

  const price = discount
    ? calculatePriceAfterDiscount(originalPrice, discount)
    : originalPrice;

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
      shop: shop?._id!,
    };
    dispatch(addToCart(item));

    notifySuccess("Product added to cart successfully");
  };

  const handleToggleWishlist = () => {
    const item: IWishlistItem = {
      id,
      title,
      discount: discount ?? 0,
      image: images[0],
      price: Number(price),
    };
    dispatch(toggleWishlist(item));

    notifySuccess("Wishlist toggled successfully");
  };

  useEffect(() => {
    if (wishlist) {
      const exists = !!wishlist.find(
        (wishlistItem) => wishlistItem.id === item._id
      );
      setWishlistExists(exists);
    }
  }, [wishlist]);

  return {
    handleAddCart,
    handleQty,
    price,
    qty,
    handleToggleWishlist,
    wishlistExists,
  };
};

export default useHandleProductInfo;
