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
    <div className="flex gap-x-2">
      <div className=" rounded-full size-16 overflow-hidden">
       <NextImage src={profile} />
      </div>
      <div>
        <Subtitle2>{name}</Subtitle2>
        <GenerateRatingStar rating={rating} size={20} />
        <Content>{comment}</Content>
      </div>
    </div>
  );
};

export default ReviewCard;
