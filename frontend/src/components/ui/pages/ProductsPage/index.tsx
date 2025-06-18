import React, { useEffect, useState } from "react";
import ProductsPageTemplate from "../../templates/ProductsPageTemplate";
import { useSearchParams } from "react-router";
import { PRODUCTS_DATA, type Product } from "@/constants/static";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (category) {
      const data = PRODUCTS_DATA.filter(
        (product) => product.category === category
      );
      setProducts(data);
    } else {
      setProducts(PRODUCTS_DATA);
    }
  }, [category]);

  return (
    <>
      <ProductsPageTemplate products={products} />
    </>
  );
};

export default ProductsPage;
