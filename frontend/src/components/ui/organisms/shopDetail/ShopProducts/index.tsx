import ProductCard from "@/components/ui/molecules/Cards/ProductCard";
import { PRODUCTS_DATA } from "@/constants/static";
import React from "react";

const ShopProductsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {PRODUCTS_DATA.slice(0, 5).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ShopProductsSection;
