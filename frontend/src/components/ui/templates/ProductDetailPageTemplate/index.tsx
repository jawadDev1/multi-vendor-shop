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
  const { description, shop } = product;

  return (
    <PageWrapper className="flex flex-col gap-y-[50px] lg:gap-y-20 px-5 lg:px-0 lg:py-20">
      <ProductHeroSection product={product} />
      <ProductInfoSection
        description={description}
        shop={shop!}
        reviews={product.reviews}
      />
      {relatedProducts && relatedProducts?.length > 0 && (
        <RelatedProductsSection products={relatedProducts} />
      )}
    </PageWrapper>
  );
};

export default ProductDetailPageTemplate;
