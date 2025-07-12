import Image from "@/components/ui/atoms/common/Image";
import GenerateRatingStar from "@/components/ui/atoms/GenerateRatingStars";
import Content from "@/components/ui/atoms/typography/Content";
import Subtitle2 from "@/components/ui/atoms/typography/Subtitle2";
import type { IReview } from "@/types/api";
import ReviewCard from "../../Cards/ReviewCard";

interface ProductReviewTabProps {
  reviews: IReview[];
}

const ProductReviewTab = ({ reviews }: ProductReviewTabProps) => {
  return (
    <div>
      {reviews && reviews.length > 0 && (
        <div className="space-y-5 max-h-[400px] overflow-y-auto">
          {reviews.map((rev) => (
            <ReviewCard
              {...{
                comment: rev.comment,
                rating: rev.rating,
                name: rev.user.name,
                profile: rev.user.name,
              }}
            />
          ))}
        </div>
      )}
      {reviews.length == 0 && (
        <Content className="text-center">No reviews yet!</Content>
      )}
    </div>
  );
};

export default ProductReviewTab;
