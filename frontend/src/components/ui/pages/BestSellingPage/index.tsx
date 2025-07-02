import { useState } from "react";

import { PRODUCTS_DATA, type Product } from "@/constants/static";
import BestSellingPageTemplate from "../../templates/BestSellingPageTemplate";
import type { IAPIUserProduct } from "@/types/api";
import useGetData from "@/hooks/useGetData";
import Loader from "../../atoms/extra/Loader";

const BestSellingPage = () => {
  const { data, loading, error } = useGetData<IAPIUserProduct[]>({
    endpoint: `product/best-selling`,
  });

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return null;
  }

  return (
    <>
      <BestSellingPageTemplate products={data} />
    </>
  );
};

export default BestSellingPage;
