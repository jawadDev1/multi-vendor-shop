import { getApiRequest } from "@/utils/api";
import ProductsPageTemplate from "../../templates/ProductsPageTemplate";
import { notFound } from "next/navigation";

const ProductsPage = async ({category}: {category?: string}) => {
  const endpoint = category
    ? `product/all-products?category=${category}`
    : `product/all-products`;
    const result = await getApiRequest(endpoint);

    if(!result?.success) {
      return notFound();
    }

    const data = result.data;

   return (
    <>
      <ProductsPageTemplate products={data} />
    </>
  );
};

export default ProductsPage;
