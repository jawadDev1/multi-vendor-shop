import SectionWrapper from "@/components/ui/atoms/SectionWrapper";
import SectionTitle from "@/components/ui/atoms/typography/SectionTitle";
import ProductCard from "@/components/ui/molecules/Cards/ProductCard";
import type { IAPIUserProduct } from "@/types/api";

interface RelatedProductsSectionProps {
  products: IAPIUserProduct[] | null;
}

const RelatedProductsSection = ({ products }: RelatedProductsSectionProps) => {

  return (
    <>
     <SectionWrapper>
        <SectionTitle className="mb-4 lg:mb-5">Related Product</SectionTitle>

        {products && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
              />
            ))}
          </div>
        )}
      </SectionWrapper>
    </>
  );
};

export default RelatedProductsSection;
