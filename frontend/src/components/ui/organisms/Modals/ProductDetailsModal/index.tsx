import Button from "@/components/ui/atoms/buttons/Button";
import Image from "@/components/ui/atoms/common/Image";
import Content from "@/components/ui/atoms/typography/Content";
import Subtitle from "@/components/ui/atoms/typography/Subtitle";
import Subtitle2 from "@/components/ui/atoms/typography/Subtitle2";
import Subtitle3 from "@/components/ui/atoms/typography/Subtitle3";
import ModalWrapper from "@/components/ui/molecules/ModalWrapper";
import type { Product } from "@/constants/static";
import type { IAPIProduct, IAPIUserProduct } from "@/types/api";
import { AiOutlineHeart } from "react-icons/ai";
import { CgClose, CgCross } from "react-icons/cg";

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

  const { images, title, originalPrice, description, category } = product;

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
                <Image src={images[0]} />
              </div>
              <div>
                <Subtitle2 className="text-blue-500">
                  {category.title}
                </Subtitle2>
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

          <Subtitle2>${originalPrice}</Subtitle2>

          {/* Quantity */}
          <div className="flex justify-between pr-3 items-center mt-3 lg:pt-4">
            <div className="flex items-center rounded overflow-hidden">
              <button className="bg-green-400 px-2 py-1">-</button>
              <div className="bg-white px-2 py-1">1</div>
              <button className="bg-green-400 px-2 py-1">+</button>
            </div>

            <AiOutlineHeart size={26} />
          </div>
          <Button className="bg-primary">Add to cart</Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ProductDetailsModal;
