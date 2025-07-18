import Content from "@/components/ui/atoms/typography/Content";
import ProductCard from "@/components/ui/molecules/Cards/ProductCard";
import type { IAPIUserProduct } from "@/types/api";

interface ShopProductsSectionProps {
  products: IAPIUserProduct[];
}

const ShopProductsSection = ({ products }: ShopProductsSectionProps) => {
  return (
    <div>
      {products && products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}

      {products && products.length == 0 && <Content>No products</Content>}
    </div>
  );
};

export default ShopProductsSection;
