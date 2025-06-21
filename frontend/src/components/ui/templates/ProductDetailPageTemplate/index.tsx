import type { Product } from "@/constants/static";
import PageWrapper from "../../atoms/PageWrapper";
import ProductHeroSection from "../../organisms/productDetail/ProductHeroSection";
import ProductInfoSection from "../../organisms/productDetail/ProductInfoSection";
import RelatedProductsSection from "../../organisms/productDetail/RelatedProductsSection";

interface ProductDetailPageTemplateProps {
  product: Product;
  relatedProducts: Product[] | null;
}

const ProductDetailPageTemplate = ({
  product,
  relatedProducts,
}: ProductDetailPageTemplateProps) => {
  const { image, title, description, price, category, rating } = product;

  return (
    <PageWrapper className="flex flex-col gap-y-[50px] lg:gap-y-20 px-5 lg:px-0">
      <ProductHeroSection
        {...{ title, price, description, image, category, rating: rating.rate }}
      />
      <ProductInfoSection />
      <RelatedProductsSection products={relatedProducts} />
    </PageWrapper>
  );
};

export default ProductDetailPageTemplate;
