import Image from "@/components/ui/atoms/common/Image";
import GenerateRatingStar from "@/components/ui/atoms/GenerateRatingStars";
import Content from "@/components/ui/atoms/typography/Content";
import Subtitle2 from "@/components/ui/atoms/typography/Subtitle2";
import type { IReview } from "@/types/api";

interface ProductReviewTabProps {
  reviews: IReview[];
}

const ProductReviewTab = ({ reviews }: ProductReviewTabProps) => {
  return (
    <div>
      {reviews && reviews.length > 0 && (
        <div className="space-y-5 max-h-[400px] overflow-y-auto">
          {reviews.map((rev) => (
            <div className="flex  gap-x-2">
              <div className=" rounded-full size-16 overflow-hidden">
                <Image src={rev.user.profile} />
              </div>
              <div>
                <Subtitle2>{rev.user.name}</Subtitle2>
                <GenerateRatingStar rating={rev.rating} size={20} />
                <Content>{rev.comment}</Content>
              </div>
            </div>
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
