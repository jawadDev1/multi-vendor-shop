import LinkButton from "@/components/ui/atoms/buttons/LinkButton";
import NextImage from "@/components/ui/atoms/common/NextImage";

import Content from "@/components/ui/atoms/typography/Content";
import SectionTitle from "@/components/ui/atoms/typography/SectionTitle";
import Subtitle from "@/components/ui/atoms/typography/Subtitle";
import Subtitle2 from "@/components/ui/atoms/typography/Subtitle2";
import Subtitle3 from "@/components/ui/atoms/typography/Subtitle3";
import Countdown from "@/components/ui/molecules/Countdown";
import type { IAPIUserEvent } from "@/types/api";
import { calculatePriceAfterDiscount } from "@/utils";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";

interface EventCardProps {
  event: IAPIUserEvent;
}

const EventCard = ({ event }: EventCardProps) => {
  const { product, start_date, end_date } = event;
  const {
    title,
    images,
    originalPrice,
    discount,
    slug,
    description,
    sold_out,
  } = product;

  const price = discount
    ? calculatePriceAfterDiscount(originalPrice, discount)
    : originalPrice;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[50%,50%] gap-6 lg:gap-5 py-8 lg:py-10 px-5 h-fit bg-white shadow-md hover:shadow-xl rounded-xl transition-all duration-200">
      <div className="space-y-3 h-fit mt-3 lg:mt-0">
        <SectionTitle className="!font-[500]">{title}</SectionTitle>
        <Content className="line-clamp-3 md:line-clamp-5">{description}</Content>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-2">
            <Subtitle className="!font-[500]">{price}$</Subtitle>
            {discount ? (
              <Subtitle3 className="line-through text-tomato-red mb-1">
                {originalPrice}
              </Subtitle3>
            ) : (
              ""
            )}
          </div>
          <Subtitle2 className="text-primary">{sold_out} Sold</Subtitle2>
        </div>

        <Countdown targetDate={end_date} start_date={start_date} />

        <div className="flex items-center gap-x-4 pt-3 md:pt-4">
          <LinkButton
            href={`/product/${slug}`}
            className="bg-primary max-w-[200px] shadow-xl"
          >
            See Details
          </LinkButton>
          {/* <LinkButton
            href={`/product/1`}
            className="bg-primary max-w-[200px] shadow-xl"
          >
            Buy Now
          </LinkButton> */}
        </div>
      </div>
      <div className="w-full lg:w-[80%] max-h-[400px] mx-auto rounded-xl overflow-hidden">
        <NextImage src={images[0]} className="object-fill" />
      </div>
    </div>
  );
};

export default EventCard;
