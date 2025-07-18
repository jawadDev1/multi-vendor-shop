
import { getServerApiRequest } from "@/actions/api";
import AllProductsPageTemplate from "@/components/ui/templates/seller/AllProductsPageTemplate";
import { getApiRequest } from "@/utils/api";

const AllProductsPage = async () => {
  const result = await getServerApiRequest('product/get-shop-products')
  
  const products = result?.data ?? [];

  return (
    <>
      <AllProductsPageTemplate key={products?.length} data={products as any} />
    </>
  );
};

export default AllProductsPage;
