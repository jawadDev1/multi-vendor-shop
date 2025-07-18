import LinkButton from "@/components/ui/atoms/buttons/LinkButton";
import NextImage from "@/components/ui/atoms/common/NextImage";

import Content from "@/components/ui/atoms/typography/Content";
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
    <div className="grid grid-cols-1 lg:grid-cols-[50%,50%] gap-x-3 py-8 lg:py-10 px-5 h-fit bg-white shadow-md hover:shadow-lg rounded-md">
      <div className="w-[70%] max-h-[400px] mx-auto">
        <NextImage src={images[0]} className="object-fill" />
      </div>

      <div className="space-y-3 h-fit mt-3 lg:mt-0">
        <Subtitle>{title}</Subtitle>
        <Content>{description}</Content>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-2">
            <Subtitle2>{price}$</Subtitle2>
            {discount ? (
              <Subtitle3 className="line-through text-tomato-red mb-1">
                {originalPrice}
              </Subtitle3>
            ) : (
              ""
            )}
          </div>
          <Subtitle2 className="text-green-400">{sold_out} Sold</Subtitle2>
        </div>

        <Countdown targetDate={end_date} start_date={start_date} />

        <div className="flex items-center gap-x-4">
          <LinkButton
            href={`/product/${slug}`}
            className="bg-primary max-w-[200px]"
          >
            See Details
          </LinkButton>
          <LinkButton href={`/product/1`} className="bg-primary max-w-[200px]">
            Buy Now
          </LinkButton>
        </div>

        <div className="text-end">
          <Link
            className="group text-dim-gray flex items-center gap-x-2 w-fit text-end self-end ml-auto hover:text-green-600 "
            href={"/events"}
          >
            See more Events{" "}
            <AiOutlineArrowRight
              size={20}
              className="text-dim-gray group-hover:text-green-600"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
