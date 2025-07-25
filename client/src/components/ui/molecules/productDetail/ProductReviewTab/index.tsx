import Content from "@/components/ui/atoms/typography/Content";
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
          {reviews.map((rev, i) => (
            <ReviewCard
              key={i}
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
