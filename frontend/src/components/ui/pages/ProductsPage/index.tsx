import ProductsPageTemplate from "../../templates/ProductsPageTemplate";
import { useSearchParams } from "react-router";
import useGetData from "@/hooks/useGetData";
import type { IAPIUserProduct } from "@/types/api";
import Loader from "../../atoms/extra/Loader";


const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const endpoint = category
    ? `product/all-products?category=${category}`
    : `product/all-products`;
  const { data, loading, error } = useGetData<IAPIUserProduct[]>({
    endpoint,
    dependencies: [category],
  });

  if (loading) {
    return <Loader />;
  }

  if (!data || error) {
    return null;
  }

  return (
    <>
      <ProductsPageTemplate products={data} />
    </>
  );
};

export default ProductsPage;
