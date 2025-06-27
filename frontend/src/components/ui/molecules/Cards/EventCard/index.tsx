import LinkButton from "@/components/ui/atoms/buttons/LinkButton";
import Image from "@/components/ui/atoms/common/Image";
import Content from "@/components/ui/atoms/typography/Content";
import Subtitle from "@/components/ui/atoms/typography/Subtitle";
import Subtitle2 from "@/components/ui/atoms/typography/Subtitle2";
import Subtitle3 from "@/components/ui/atoms/typography/Subtitle3";
import Countdown from "@/components/ui/molecules/Countdown";

import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router";

const EventCard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[50%,50%] gap-x-3 py-8 lg:py-10 px-5 h-fit bg-white shadow rounded-md">
      <div className="w-[70%] max-h-[400px] mx-auto">
        <Image
          src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
          className="object-fill"
        />
      </div>

      <div className="space-y-3 h-fit mt-3 lg:mt-0">
        <Subtitle>There is nothing to say right now</Subtitle>
        <Content>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus repudiandae ullam quaerat eum a dolore, soluta
          perspiciatis illum alias ab autem deleniti sequi voluptatibus,
          quibusdam dolorem minus asperiores sed officiis? Quis doloremque
          aliquid a maiores beatae recusandae debitis tenetur earum.
        </Content>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-2">
            <Subtitle2>$1099</Subtitle2>
            <Subtitle3 className="line-through text-tomato-red mb-1">
              $2099
            </Subtitle3>
          </div>
          <Subtitle2 className="text-green-400">120 Sold</Subtitle2>
        </div>

        <Countdown targetDate="2025-06-20T15:00:00Z" />

        <div className="flex items-center gap-x-4">
          <LinkButton to={`/product/1`} className="bg-primary max-w-[200px]">
            See Details
          </LinkButton>
          <LinkButton to={`/product/1`} className="bg-primary max-w-[200px]">
            Buy Now
          </LinkButton>
        </div>

        <div className="text-end">
          <Link
            className="group text-dim-gray flex items-center gap-x-2 w-fit text-end self-end ml-auto hover:text-green-600 "
            to={"/events"}
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
