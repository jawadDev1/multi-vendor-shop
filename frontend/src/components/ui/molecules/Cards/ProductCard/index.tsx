import Subtitle2 from "@/components/ui/atoms/typography/Subtitle2";
import Subtitle3 from "@/components/ui/atoms/typography/Subtitle3";

import { AiOutlineEye, AiOutlineHeart } from "react-icons/ai";

import CardTitle from "@/components/ui/atoms/typography/CardTitle";
import Cart from "@/components/icons/Cart";
import Image from "@/components/ui/atoms/common/Image";
import GenerateRatingStar from "@/components/ui/atoms/GenerateRatingStars";
import type { Product } from "@/constants/static";
import cn from "@/utils/cn";
import type { HTMLAttributes } from "react";
import { Link } from "react-router";

type ProductCardProps = {
  product: Product;
  className?: string;
  handleProductView: (product: Product) => void;
} & HTMLAttributes<HTMLDivElement>;

const ProductCard = ({
  product,
  className,
  handleProductView,
  ...props
}: ProductCardProps) => {
  const { category, title, image, rating, price } = product;
  return (
    <div
      className={cn("bg-white py-2 px-2 shadow rounded-md", className)}
      {...props}
    >
      <div className="relative py-2">
        <div className="w-[90%] mx-auto h-[250px] ">
          <Image src={image} className="object-fill" />
        </div>
        <div className="absolute bg-white px-1 py-2 rounded right-1 top-3 grid grid-cols-1 gap-3">
          <AiOutlineHeart
            className="cursor-pointer"
            size={24}
            color="#231f20"
          />

          <span onClick={() => handleProductView(product)}>
            <AiOutlineEye
              className="cursor-pointer"
              size={24}
              color="#231f20"
            />
          </span>
          <Cart className="size-[24px] cursor-pointer" />
        </div>
      </div>
      <div className="mt-3 ">
        <Subtitle3 className="text-blue-400">{category}</Subtitle3>
        <Link to={`/products/${title}`}>
          <CardTitle className="line-clamp-2 mt-3 mb-2">{title}</CardTitle>
        </Link>

        <GenerateRatingStar rating={Math.floor(rating.rate)} />

        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center gap-2">
            <Subtitle2 className="!font-semibold">{price}</Subtitle2>
            <Subtitle3 className="line-through text-tomato-red mb-1">
              3224$
            </Subtitle3>
          </div>
          <Subtitle2 className="text-green-500">32 sold</Subtitle2>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
