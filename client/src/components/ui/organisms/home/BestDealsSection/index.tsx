import SectionWrapper from "@/components/ui/atoms/SectionWrapper";
import SectionTitle from "@/components/ui/atoms/typography/SectionTitle";
import ProductCard from "@/components/ui/molecules/Cards/ProductCard";
import { getApiRequest } from "@/utils/api";
import { IAPIUserProductResponse } from "@/types/api";

const BestDealsSection = async () => {
  const best_deals_response: IAPIUserProductResponse = await getApiRequest(
    "product/best-deals"
  );

  if (!best_deals_response?.success) {
    return null;
  }
  
  const best_deals = best_deals_response.data;

  if(best_deals?.length === 0) {
    return null
  }


 return (

    <>
      <SectionWrapper>
        <SectionTitle className="mb-7 lg:mb-8">Best Deals</SectionTitle>
        {best_deals && best_deals.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-5 px-5 lg:px-0">
            {best_deals.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </SectionWrapper>
    </>
  );
};

export default BestDealsSection;
