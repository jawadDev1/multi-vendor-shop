import cn from "@/utils/cn";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface GetRatingStarsProps {
  rating: number;
  size?: number;
  className?: string;
}

const GenerateRatingStar = ({
  rating,
  size = 24,
  className,
}: GetRatingStarsProps) => {
  return (
    <div className={cn("flex items-center gap-x-2", className)}>
      {Array.from({ length: 5 }).map((_, i: number) => {
        const rate = rating - i - 1;
        return rate > 0 ? (
          <AiFillStar key={i} size={size} color="#efe909" />
        ) : (
          <AiOutlineStar key={i} size={size} color="#efe909" />
        );
      })}
    </div>
  );
};

export default GenerateRatingStar;
