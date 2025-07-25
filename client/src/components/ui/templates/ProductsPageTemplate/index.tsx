import SectionWrapper from "../../atoms/SectionWrapper";
import ProductCard from "../../molecules/Cards/ProductCard";
import Content from "../../atoms/typography/Content";
import PageWrapper from "../../atoms/PageWrapper";
import type { IAPIUserProduct } from "@/types/api";
import { ProductSearchParams } from "@/app/(user)/products/page";
import ProductsFilter from "../../organisms/Productsfilter";

interface ProductsPageTemplateProps {
  products: IAPIUserProduct[];
  params: ProductSearchParams;
  categories: { label: string; value: string }[];
}

const ProductsPageTemplate = ({
  products,
  params,
  categories,
}: ProductsPageTemplateProps) => {
  return (
    <>
      <PageWrapper className="min-h-[60vh]  py-8 lg:py-10 grid grid-cols-1 md:grid-cols-[25%,2%,1fr] ">
        <ProductsFilter categories={categories} params={params} />
        <div />
        <SectionWrapper className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-5 lg:px-0 gap-7 lg:gap-10 ">
          {products &&
            products.length > 0 &&
            products.map((product) => (
              <ProductCard key={product.slug} product={product} />
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
