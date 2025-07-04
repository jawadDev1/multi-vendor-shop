import Button from "@/components/ui/atoms/buttons/Button";
import Image from "@/components/ui/atoms/common/Image";
import Content from "@/components/ui/atoms/typography/Content";
import Subtitle from "@/components/ui/atoms/typography/Subtitle";
import Subtitle2 from "@/components/ui/atoms/typography/Subtitle2";
import Subtitle3 from "@/components/ui/atoms/typography/Subtitle3";
import ModalWrapper from "@/components/ui/molecules/ModalWrapper";
import useHandleProductInfo from "@/hooks/useHandleProductInfo";
import type { IAPIUserProduct } from "@/types/api";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import { Link } from "react-router";

interface ProductDetailsModalProps {
  isOpen: boolean;
  handleModal: () => void;
  product: IAPIUserProduct | null;
}

const ProductDetailsModal = ({
  isOpen,
  handleModal,
  product,
}: ProductDetailsModalProps) => {
  if (!product) return null;
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

  const { images, title, originalPrice, discount, description, shop } = product;

  return (
    <ModalWrapper
      isOpen={isOpen}
      className="relative py-6 px-3 lg:py-6 lg:px-4 h-[80vh] lg:h-[700px] lg:max-w-[800px] lg:max-h-[700px] overflow-y-auto "
      parentClassName="px-2"
    >
      <span
        onClick={handleModal}
        className="absolute top-1 lg:top-4 cursor-pointer right-2 lg:right-8"
      >
        <CgClose size={26} />
      </span>

      <div className="grid grid-cols-1 lg:grid-cols-[40%,60%] gap-x-3 py-3 ">
        <div>
          <div className="w-[90%] mx-auto h-[300px] lg:h-[400px]">
            <Image src={images[0]} className="object-fill" />
          </div>
          <div className="mt-7 lg:mt-92">
            <div className="flex gap-x-3">
              <div className="size-10 rounded-full">
                <Image src={shop?.logo!} />
              </div>
              <div>
                <Link to={`/shop/${shop?.slug}`}>
                  <Subtitle2 className="text-blue-500">
                    {shop?.shop_name}
                  </Subtitle2>
                </Link>
                <Subtitle3>4.5 Rating</Subtitle3>
                {/* <Subtitle3>{rating.rate} Rating</Subtitle3> */}
              </div>
            </div>

            <Button className="max-w-[200px] mt-3 bg-primary">Message</Button>
          </div>
        </div>
        <div className="space-y-3 px-2 mt-4 lg:mt-0">
          <Subtitle className="!font-semibold">{title}</Subtitle>
          <Content>{description}</Content>

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

          {/* Quantity */}
          <div className="flex justify-between pr-3 items-center mt-3 lg:pt-4">
            <div className="flex items-center rounded overflow-hidden">
              <button
                onClick={() => handleQty("dec")}
                className="bg-green-400 px-2 py-1"
              >
                -
              </button>
              <div className="bg-white px-2 py-1">{qty}</div>
              <button
                onClick={() => handleQty("inc")}
                className="bg-green-400 px-2 py-1"
              >
                +
              </button>
            </div>

            <div onClick={handleToggleWishlist} className="cursor-pointer">
              {wishlistExists ? (
                <AiFillHeart size={26} color="red" />
              ) : (
                <AiOutlineHeart size={26} />
              )}
            </div>
          </div>
          <Button onClick={handleAddCart} className="bg-primary">
            Add to cart
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ProductDetailsModal;
