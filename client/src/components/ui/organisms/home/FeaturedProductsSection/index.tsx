import SectionWrapper from "@/components/ui/atoms/SectionWrapper";
import SectionTitle from "@/components/ui/atoms/typography/SectionTitle";
import ProductCard from "@/components/ui/molecules/Cards/ProductCard";
import type { IAPIUserProductResponse } from "@/types/api";
import { getApiRequest } from "@/utils/api";
import { notFound } from "next/navigation";

const FeaturedProductsSection = async () => {
  const response: IAPIUserProductResponse = await getApiRequest(
    "product/featured"
  );

  if (!response?.success) {
    return notFound();
  }
  const featured_products = response.data;

  return (
    <>
      <SectionWrapper>
        <SectionTitle className="mb-7 lg:mb-8">Featured</SectionTitle>
        {featured_products && featured_products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-5 px-5 lg:px-0">
            {featured_products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </SectionWrapper>
    </>
  );
};

export default FeaturedProductsSection;
