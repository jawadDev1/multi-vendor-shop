import SectionWrapper from "../../atoms/SectionWrapper";
import ProductCard from "../../molecules/Cards/ProductCard";
import Content from "../../atoms/typography/Content";
import type { IAPIUserProduct } from "@/types/api";

interface BestSellingPageTemplateProps {
  products: IAPIUserProduct[];
}

const BestSellingPageTemplate = ({
  products,
}: BestSellingPageTemplateProps) => {

  return (
    <>
     <main className="min-h-[60vh] bg-gray-50 py-8 lg:py-10">
        <SectionWrapper className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-5 lg:px-0 gap-7 lg:gap-10 ">
          {products &&
            products.length > 0 &&
            products.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
              />
            ))}
        </SectionWrapper>
        {products.length == 0 && (
          <Content className="text-center">No data found</Content>
        )}
      </main>
    </>
  );
};

export default BestSellingPageTemplate;
