"use client";
import Subtitle2 from "@/components/ui/atoms/typography/Subtitle2";
import Subtitle3 from "@/components/ui/atoms/typography/Subtitle3";
import { AiFillHeart,  AiOutlineHeart } from "react-icons/ai";
import CardTitle from "@/components/ui/atoms/typography/CardTitle";
import Cart from "@/components/icons/Cart";
import NextImage from "@/components/ui/atoms/common/NextImage";

import GenerateRatingStar from "@/components/ui/atoms/GenerateRatingStars";
import { useEffect, useState, type HTMLAttributes } from "react";
import ProductDetailsModal from "@/components/ui/organisms/Modals/ProductDetailsModal";
import type { IAPIUserProduct } from "@/types/api";
import { calculatePriceAfterDiscount } from "@/utils";
import type { ICartItem, IWishlistItem } from "@/types/common";
import { notifySuccess } from "@/utils/toast";
import { useCartStore } from "@/stores/cart-store";
import Link from "next/link";
import Button from "@/components/ui/atoms/buttons/Button";
import Content from "@/components/ui/atoms/typography/Content";

type ProductCardProps = {
  product: IAPIUserProduct;
  className?: string;
  handleProductView?: (product: IAPIUserProduct) => void;
} & HTMLAttributes<HTMLDivElement>;

const ProductCard = ({
  product,
  className,
  handleProductView,
  ...props
}: ProductCardProps) => {
  const {
    shop,
    title,
    images,
    originalPrice,
    slug,
    discount,
    _id: id,
    stock,
    description,
    rating,
  } = product;
  const [wishlistExists, setWishlistExists] = useState<boolean>(false);

  // Cart Store
  const { toggleWishlist, addToCart, wishlist } = useCartStore();

  const price = discount
    ? calculatePriceAfterDiscount(originalPrice, discount)
    : originalPrice;

  const handleToggleWishlist = () => {
    const item: IWishlistItem = {
      discount: discount!,
      id,
      image: images[0],
      price,
      title,
      slug,
    };

    toggleWishlist(item);
  };

  const handleAddCart = () => {
    const item: ICartItem = {
      discount: discount!,
      id,
      image: images[0],
      price,
      qty: 1,
      stock,
      title,
      slug,
      shop: shop?._id!,
    };
    addToCart(item);
    notifySuccess("Added to cart successfully");
  };

  useEffect(() => {
    if (wishlist) {
      const exits = !!wishlist.find((item) => item.id === id);

      setWishlistExists(exits);
    }
  }, [wishlist]);

  return (
    <>
      
      <div className="rounded-3xl hover:shadow-xl group transition-all duration-200 shadow-md overflow-hidden shrink-0 min-h-[422px] h-full relative">
        <div className="w-full h-[55%] group-hover:scale-105 transition-all duration-300">
          <NextImage src={images[0]} className="object-fill" />
        </div>

        <div className="absolute -bbottom-[10%] -translate-y-[10%]  z-10 left-0 flex flex-col w-full h-[50%] gap-y-3 bg-white px-3 py-4 rounded-3xl">
          <div className="flex justify-between items-center">
            <div>
              <Link href={`/shop/${shop?.slug}`}>
                <Subtitle3 className="mb-1" >
                  {shop?.shop_name}
                </Subtitle3>
              </Link>
              <Link href={`/products/${encodeURIComponent(slug)}`}>
                <CardTitle className="line-clamp-2">{title}</CardTitle>
              </Link>
            </div>
            <span onClick={handleToggleWishlist} className="cursor-pointer">
              {wishlistExists ? (
                <AiFillHeart size={24} color="red" />
              ) : (
                <AiOutlineHeart size={24} />
              )}
            </span>
          </div>

          {rating > 0 ? (
            <GenerateRatingStar rating={rating ?? 0} />
          ) : (
            <Content className="line-clamp-2">{description}</Content>
          )}
          <div className="flex flex-col justify-between mt-auto gap-y-3 items-center">
            <div className="flex justify-start text-start w-full items-center gap-2">
              <Subtitle2 className="!font-semibold">{price}$</Subtitle2>
              {discount ? (
                <Subtitle3 className="line-through text-tomato-red mb-1">
                  {originalPrice}$
                </Subtitle3>
              ) : (
                ""
              )}
            </div>

            <Button
              onClick={handleAddCart}
              className="flex justify-center items-center gap-x-1  rounded-full"
            >
              <Cart className="size-[24px] text-white " />
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;

