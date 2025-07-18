
import { getServerApiRequest } from "@/actions/api";
import UpdateProductPageTemplate from "@/components/ui/templates/seller/UpdateProductPageTemplate";
import { notFound } from "next/navigation";

const UpdateProductPage = async ({id}: {id: string}) => {
  const result = await getServerApiRequest(`product/get-single/${id}`)

  if(!result?.success) {
    return notFound();
  }

  const categoriesRes = await getServerApiRequest(`category/get-form-categories`)

  const product = result?.data;
  const categories = categoriesRes?.data;

  return (
    <>
      <UpdateProductPageTemplate categories={categories} product={product} />
    </>
  );
};

export default UpdateProductPage;
