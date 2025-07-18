import ProductDetailPageTemplate from "../../templates/ProductDetailPageTemplate";
import { getApiRequest } from "@/utils/api";
import { notFound } from "next/navigation";


const ProductDetialPage = async ({slug}: {slug: string}) => {
  const result = await getApiRequest(`product/product-details/${slug}`)

  if(!result?.success) {
    return notFound();
  }

  const {product: productDetails, relatedProducts} = result.data

  return (
    <>
      <ProductDetailPageTemplate
        product={productDetails}
        relatedProducts={relatedProducts}
      />
    </>
  );
};

export default ProductDetialPage;
