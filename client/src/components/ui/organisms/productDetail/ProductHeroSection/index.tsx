"use client";
import Button from "@/components/ui/atoms/buttons/Button";
import NextImage from "@/components/ui/atoms/common/NextImage";
import GenerateRatingStar from "@/components/ui/atoms/GenerateRatingStars";

import SectionWrapper from "@/components/ui/atoms/SectionWrapper";
import Content from "@/components/ui/atoms/typography/Content";
import Subtitle from "@/components/ui/atoms/typography/Subtitle";
import Subtitle2 from "@/components/ui/atoms/typography/Subtitle2";
import Subtitle3 from "@/components/ui/atoms/typography/Subtitle3";
import ProductImages from "@/components/ui/molecules/productDetail/ProductImages";
import useHandleProductInfo from "@/hooks/useHandleProductInfo";
import useSendMessage from "@/hooks/useSendMessage";
import type { IAPIUserProduct } from "@/types/api";
import Link from "next/link";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface Props {
  product: IAPIUserProduct;
}

const ProductHeroSection = ({ product }: Props) => {
  const { title, images, description, originalPrice, discount, shop, rating } =
    product;

  const {
    handleAddCart,
    handleQty,
    price,
    qty,
    handleToggleWishlist,
    wishlistExists,
  } = useHandleProductInfo({
    item: product,
  });

  const { handleSendMessage } = useSendMessage({
    created_by: product.created_by,
  });

  return (
    <SectionWrapper className="grid grid-cols-1 md:grid-cols-[45%,2%,53%]  gap-y-5 w-full ">
      <ProductImages images={images} />
      <div className="bg-transparent"></div>
      <div >
        <div className="flex items-center justify-between">
          <Subtitle>{title}</Subtitle>
          <div className="cursor-pointer" onClick={handleToggleWishlist}>
            {wishlistExists ? (
              <AiFillHeart size={30} color="red" />
            ) : (
              <AiOutlineHeart size={30} />
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-3 mt-3">
          <div className="flex items-center gap-x-2">
            <Subtitle>${price}</Subtitle>
            {discount ? (
              <Subtitle2 className="text-tomato-red line-through mb-2">
                {originalPrice}$
              </Subtitle2>
            ) : (
              ""
            )}
          </div>

          <div className="h-8 w-[2px] bg-charcoal-gray/50 hidden md:block" />
          <GenerateRatingStar rating={rating} />

          <Subtitle3>({product?.reviews?.length || 0} reviews)</Subtitle3>
        </div>


        <Content className="mt-6 md:mt-10 mb-4">{description}</Content>

          <div className="flex items-center rounded-full my-5 overflow-hidden border border-blue-gray w-fit">
            <button
              onClick={() => handleQty("dec")}
              className="px-4 text-charcoal py-1.5"
            >
              -
            </button>
            <div className="bg-blue-50 px-3  py-1">{qty}</div>
            <button
              onClick={() => handleQty("inc")}
              className=" text-charcoal px-4 py-1.5"
            >
              +
            </button>
          </div>
        <Button onClick={handleAddCart} className="bg-primary max-w-[300px]">
          Add to cart
        </Button>

        <div className="flex gap-x-3 items-center  mt-10">
          <div className="size-12 rounded-full overflow-hidden">
            <NextImage src={shop?.logo!} />
          </div>
          <div>
            <Link href={`/shop/${shop?.slug}`}>
              <Subtitle2 className="text-azure-blue">
                {shop?.shop_name}
              </Subtitle2>
            </Link>
            <Subtitle3>({shop?.rating}/5) Rating</Subtitle3>
          </div>
          <Button onClick={handleSendMessage} className="max-w-fit py-3 bg-blue-gray">
            Send message
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ProductHeroSection;
