import { getApiRequest } from "@/utils/api";
import ProductsPageTemplate from "../../templates/ProductsPageTemplate";
import { notFound } from "next/navigation";
import { ProductSearchParams } from "@/app/(user)/products/page";
import { generateQuery } from "@/utils";

interface ProductsPageParams {
  params: ProductSearchParams
}

const ProductsPage = async ({params}: ProductsPageParams) => {

  const query = generateQuery(params);


    const result = await getApiRequest(`product/get-products?${query}`);

    if(!result?.success) {
      return notFound();
    }

    const categoryRes = await getApiRequest(`category/get-form-categories`)

    const categories = categoryRes?.data ?? [];

    const data = result.data;

   return (
    <>
      <ProductsPageTemplate products={data} params={params} categories={categories} />
    </>
  );
};

export default ProductsPage;
