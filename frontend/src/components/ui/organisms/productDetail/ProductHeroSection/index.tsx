import Button from "@/components/ui/atoms/buttons/Button";
import Image from "@/components/ui/atoms/common/Image";
import SectionWrapper from "@/components/ui/atoms/SectionWrapper";
import Content from "@/components/ui/atoms/typography/Content";
import Subtitle from "@/components/ui/atoms/typography/Subtitle";
import Subtitle2 from "@/components/ui/atoms/typography/Subtitle2";
import Subtitle3 from "@/components/ui/atoms/typography/Subtitle3";
import { AiOutlineHeart } from "react-icons/ai";

interface Props {
  title: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  price: number;
}

const ProductHeroSection = ({
  title,
  image,
  description,
  price,
  category,
  rating,
}: Props) => {
  return (
    <SectionWrapper className="grid grid-cols-1 md:grid-cols-[45%,55%] gap-x-7 gap-y-5">
      <div className="">
        <div className="w-[80%] mx-auto max-h-[300px] lg:max-h-[400px] h-full">
          <Image src={image} />
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6 lg:mt-7 ">
          <div className="w-full h-full border border-dim-gray/40 rounded-md p-6 max-h-[200px] lg:max-h-[240px]">
            <Image src={image} />
          </div>
          <div className="w-full h-full border border-dim-gray/40 rounded-md p-6 max-h-[200px] lg:max-h-[240px] ">
            <Image src={image} />
          </div>
        </div>
      </div>

      <div>
        <Subtitle>{title}</Subtitle>

        <Content className="mt-2 mb-4">{description}</Content>

        <div className="flex items-center gap-x-2">
          <Subtitle>${price}</Subtitle>
          <Subtitle2 className="text-tomato-red line-through mb-2">
            $832
          </Subtitle2>
        </div>

        <div className="flex justify-between pr-3 items-center my-3 lg:py-4">
          <div className="flex items-center rounded overflow-hidden">
            <button className="bg-green-400 px-4 text-white py-1.5">-</button>
            <div className="bg-blue-50 px-3  py-1">1</div>
            <button className="bg-green-400 text-white px-4 py-1.5">+</button>
          </div>

          <AiOutlineHeart size={30} />
        </div>
        <Button className="bg-primary max-w-[300px]">Add to cart</Button>

        <div className="flex gap-x-3 items-center mt-5 lg:mt-10">
          <div className="size-12 rounded-full overflow-hidden">
            <Image src={image} />
          </div>
          <div>
            <Subtitle2 className="text-azure-blue">{category}</Subtitle2>
            <Subtitle3>({rating}) Rating</Subtitle3>
          </div>
          <Button className="max-w-[300px] bg-dark-azure">Send message</Button>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ProductHeroSection;
