import NextImage from "@/components/ui/atoms/common/NextImage";

import GenerateRatingStar from "@/components/ui/atoms/GenerateRatingStars";
import Content from "@/components/ui/atoms/typography/Content";
import Subtitle2 from "@/components/ui/atoms/typography/Subtitle2";
import React from "react";

interface ReviewCardProps {
  profile: string;
  name: string;
  rating: number;
  comment: string;
}

const ReviewCard = ({ profile, name, rating, comment }: ReviewCardProps) => {
  return (
    <div className="flex w-full gap-x-2 border rounded-xl border-charcoal-gray/30">
      <div className=" rounded-full size-16 overflow-hidden">
        <NextImage src={profile} />
      </div>
      <div>
        <div className="flex justify-between items-center">
          <Subtitle2>{name}</Subtitle2>
          <GenerateRatingStar rating={rating} size={20} />
        </div>
        <Content>{comment}</Content>
      </div>
    </div>
  );
};

export default ReviewCard;
