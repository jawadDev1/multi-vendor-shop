import ProductsPage from "@/components/ui/pages/ProductsPage";
import React from "react";

export interface ProductSearchParams {
  category?: string;
  min_price?: string;
  max_price?: string;
  search?: string;
}

interface ProductsProps {
  searchParams: ProductSearchParams;
}

const Products = async ({ searchParams }: ProductsProps) => {
  const params = await searchParams;
  return <ProductsPage  params={params} />;
};

export default Products;
