import { CgClose } from "react-icons/cg";
import Image from "../../common/Image";
import CardTitle from "../../typography/CardTitle";
import Content from "../../typography/Content";
import Subtitle2 from "../../typography/Subtitle2";

import CartPlus from "@/components/icons/CartPlus";
import type { IWishlistItem } from "@/types/common";
import { calculatePriceAfterDiscount } from "@/utils";
import { useAppDispatch } from "@/app/hooks";
import { toggleWishlist } from "@/features/cart/cartSlice";

interface WishlistItemProps {
  item: IWishlistItem;
}

const WishlistItem = ({ item }: WishlistItemProps) => {
  const { image, title, price: originalPrice, discount } = item;
  const dispatch = useAppDispatch();

  const price = discount
    ? calculatePriceAfterDiscount(originalPrice, discount)
    : originalPrice;

  const handleWishlistItem = () => {
    dispatch(toggleWishlist(item));
  };

  return (
    <div className="grid grid-cols-[5%,20%,1fr,10%] gap-x-3 w-full pt-4 lg:pt-6 border-t border-dim-gray/30">
      <div
        onClick={handleWishlistItem}
        className=" flex items-center cursor-pointer"
      >
        <CgClose size={20} />
      </div>

      <div className="w-full h-20">
        <Image src={image} className="object-fill" />
      </div>

      <div className="space-y-">
        <CardTitle className="line-clamp-2">{title}</CardTitle>
        <div className="flex items-center gap-x-2">
          <Subtitle2>${price}</Subtitle2>
          {discount ? (
            <Subtitle2 className="text-tomato-red line-through mb-2">
              {originalPrice}$
            </Subtitle2>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="flex items-center">
        <CartPlus className="size-6" />
      </div>
    </div>
  );
};

export default WishlistItem;
