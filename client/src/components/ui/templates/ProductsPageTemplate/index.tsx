import SectionWrapper from "../../atoms/SectionWrapper";
import type { Product } from "@/constants/static";
import ProductCard from "../../molecules/Cards/ProductCard";
import Content from "../../atoms/typography/Content";
import PageWrapper from "../../atoms/PageWrapper";
import type { IAPIUserProduct } from "@/types/api";

interface ProductsPageTemplateProps {
  products: IAPIUserProduct[];
}

const ProductsPageTemplate = ({ products }: ProductsPageTemplateProps) => {  

  return (
    <>
      
      <PageWrapper className="min-h-[60vh] bg-gray-50 py-8 lg:py-10">
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
      </PageWrapper>
    </>
  );
};

export default ProductsPageTemplate;
