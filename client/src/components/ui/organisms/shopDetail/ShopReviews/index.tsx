import Loader from "@/components/ui/atoms/extra/Loader";
import Content from "@/components/ui/atoms/typography/Content";
import ReviewCard from "@/components/ui/molecules/Cards/ReviewCard";
import useGetData from "@/hooks/useGetData";
import type { IAPIReviews } from "@/types/api";

interface ShopReviewsSectionProps {
  slug: string;
}

const ShopReviewsSection = ({ slug }: ShopReviewsSectionProps) => {
  const { data, error, loading } = useGetData<IAPIReviews[][]>({
    endpoint: `shop/reviews/${slug}`,
  });

  if (loading) return <Loader />;

  if (data && data.length === 0)
    return <Content className="text-center">No reviews yet!</Content>;

  return (
    <div>
      {data && data.length > 0 && (
        <div className="space-y-5 max-h-[400px] overflow-y-auto">
          {data.map((product) =>
            product.map((rev, i) => (
              <ReviewCard
                key={i}
                {...{
                  comment: rev.comment,
                  rating: rev.rating,
                  name: rev.name,
                  profile: rev.profile,
                }}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ShopReviewsSection;
