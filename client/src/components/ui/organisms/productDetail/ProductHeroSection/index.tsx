'use client';
import Button from "@/components/ui/atoms/buttons/Button";
import NextImage from "@/components/ui/atoms/common/NextImage";

import SectionWrapper from "@/components/ui/atoms/SectionWrapper";
import Content from "@/components/ui/atoms/typography/Content";
import Subtitle from "@/components/ui/atoms/typography/Subtitle";
import Subtitle2 from "@/components/ui/atoms/typography/Subtitle2";
import Subtitle3 from "@/components/ui/atoms/typography/Subtitle3";
import useHandleProductInfo from "@/hooks/useHandleProductInfo";
import useSendMessage from "@/hooks/useSendMessage";
import type { IAPIUserProduct } from "@/types/api";
import Link from "next/link";

import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface Props {
  product: IAPIUserProduct;
}

const ProductHeroSection = ({ product }: Props) => {
  const { title, images, description, originalPrice, discount, shop } = product;

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

  const [slectedImage, setSlectedImage] = useState<number>(0);
  const { handleSendMessage } = useSendMessage({
    created_by: product.created_by,
  });

  const handleImageChange = (index: number) => {
    setSlectedImage(index);
  };

  return (
    <SectionWrapper className="grid grid-cols-1 md:grid-cols-[45%,55%] gap-x-7 gap-y-5">
      <div className="">
        <div className="w-[80%] mx-auto max-h-[300px] lg:max-h-[400px] h-full">
         <NextImage src={images[slectedImage]} />
        </div>
        <div className="">
          {images && images.length > 1 && (
            <div className="grid grid-cols-2 gap-3 mt-6 lg:mt-7 ">
              {images.map(
                (src, i) =>
                  i !== slectedImage && (
                    <div
                      key={i}
                      onClick={() => handleImageChange(i)}
                      className="w-full h-full border border-dim-gray/40 rounded-md p-6 max-h-[200px] lg:max-h-[240px] cursor-pointer "
                    >
                     <NextImage src={src} />
                    </div>
                  )
              )}
            </div>
          )}
        </div>
      </div>

      <div>
        <Subtitle>{title}</Subtitle>

        <Content className="mt-2 mb-4">{description}</Content>

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

        <div className="flex justify-between pr-3 items-center my-3 lg:py-4">
          <div className="flex items-center rounded overflow-hidden">
            <button
              onClick={() => handleQty("dec")}
              className="bg-green-400 px-4 text-white py-1.5"
            >
              -
            </button>
            <div className="bg-blue-50 px-3  py-1">{qty}</div>
            <button
              onClick={() => handleQty("inc")}
              className="bg-green-400 text-white px-4 py-1.5"
            >
              +
            </button>
          </div>

          <div className="cursor-pointer" onClick={handleToggleWishlist}>
            {wishlistExists ? (
              <AiFillHeart size={30} color="red" />
            ) : (
              <AiOutlineHeart size={30} />
            )}
          </div>
        </div>
        <Button onClick={handleAddCart} className="bg-primary max-w-[300px]">
          Add to cart
        </Button>

        <div className="flex gap-x-3 items-center mt-5 lg:mt-10">
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
          <Button onClick={handleSendMessage} className="max-w-[150px] py-2">
            Send message
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ProductHeroSection;
