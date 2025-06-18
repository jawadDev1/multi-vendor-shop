import {  useState } from "react";


import { PRODUCTS_DATA, type Product } from "@/constants/static";
import BestSellingPageTemplate from "../../templates/BestSellingPageTemplate";

const BestSellingPage = () => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS_DATA);

  

  return (
    <>
      <BestSellingPageTemplate products={products} />
    </>
  );
};

export default BestSellingPage;
