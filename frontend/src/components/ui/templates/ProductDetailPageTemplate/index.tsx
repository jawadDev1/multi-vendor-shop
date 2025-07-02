import PageWrapper from "../../atoms/PageWrapper";
import ProductHeroSection from "../../organisms/productDetail/ProductHeroSection";
import ProductInfoSection from "../../organisms/productDetail/ProductInfoSection";
import RelatedProductsSection from "../../organisms/productDetail/RelatedProductsSection";
import type { IAPIUserProduct } from "@/types/api";

interface ProductDetailPageTemplateProps {
  product: IAPIUserProduct;
  relatedProducts: IAPIUserProduct[] | null;
}

const ProductDetailPageTemplate = ({
  product,
  relatedProducts,
}: ProductDetailPageTemplateProps) => {
  const {
    images,
    title,
    description,
    originalPrice,
    category,
    discount,
    shop,
  } = product;

  return (
    <PageWrapper className="flex flex-col gap-y-[50px] lg:gap-y-20 px-5 lg:px-0">
      <ProductHeroSection
        {...{
          category,
          title,
          originalPrice,
          description,
          images,
          discount,
          shop,
        }}
      />
      <ProductInfoSection description={description} shop={shop!} />
      {relatedProducts && relatedProducts?.length > 0 && (
        <RelatedProductsSection products={relatedProducts} />
      )}
    </PageWrapper>
  );
};

export default ProductDetailPageTemplate;
