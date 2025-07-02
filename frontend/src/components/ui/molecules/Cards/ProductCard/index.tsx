import Subtitle2 from "@/components/ui/atoms/typography/Subtitle2";
import Subtitle3 from "@/components/ui/atoms/typography/Subtitle3";
import { AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import CardTitle from "@/components/ui/atoms/typography/CardTitle";
import Cart from "@/components/icons/Cart";
import Image from "@/components/ui/atoms/common/Image";
import GenerateRatingStar from "@/components/ui/atoms/GenerateRatingStars";
import cn from "@/utils/cn";
import { useState, type HTMLAttributes } from "react";
import { Link } from "react-router";
import ProductDetailsModal from "@/components/ui/organisms/Modals/ProductDetailsModal";
import type { IAPIUserProduct } from "@/types/api";
import { calculatePriceAfterDiscount } from "@/utils";

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
  const { category, title, images, originalPrice, slug, discount } = product;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const price = discount
    ? calculatePriceAfterDiscount(originalPrice, discount)
    : originalPrice;

  return (
    <>
      <ProductDetailsModal
        isOpen={isModalOpen}
        handleModal={() => setIsModalOpen(false)}
        product={product}
      />
      <div
        className={cn("bg-white py-2 px-2 shadow rounded-md", className)}
        {...props}
      >
        <div className="relative py-2">
          <div className="w-[90%] mx-auto h-[250px] ">
            <Image src={images[0]} className="object-fill" />
          </div>
          <div className="absolute bg-white px-1 py-2 rounded right-1 top-3 grid grid-cols-1 gap-3">
            <AiOutlineHeart
              className="cursor-pointer"
              size={24}
              color="#231f20"
            />

            <span onClick={() => setIsModalOpen(!isModalOpen)}>
              <AiOutlineEye
                className="cursor-pointer"
                size={24}
                color="#231f20"
              />
            </span>
            <Cart className="size-[24px] cursor-pointer" />
          </div>
        </div>
        <div className="mt-3 flex flex-col lg:min-h-[150px] ">
          <Subtitle3 className="text-blue-400">{category?.title}</Subtitle3>
          <Link to={`/products/${encodeURIComponent(slug)}`}>
            <CardTitle className="line-clamp-2 mt-3 mb-2">{title}</CardTitle>
          </Link>

          <GenerateRatingStar rating={Math.floor(4)} />
          {/* <GenerateRatingStar rating={Math.floor(rating.rate)} /> */}

          <div className="flex justify-between items-center mt-auto">
            <div className="flex items-center gap-2">
              <Subtitle2 className="!font-semibold">{price}$</Subtitle2>
              {discount ? (
                <Subtitle3 className="line-through text-tomato-red mb-1">
                  {originalPrice}$
                </Subtitle3>
              ) : (
                ""
              )}
            </div>
            <Subtitle2 className="text-green-500">32 sold</Subtitle2>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
