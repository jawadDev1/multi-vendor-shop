import { getServerApiRequest } from "@/actions/api";
import UpdateSellerEventPageTemplate from "@/components/ui/templates/seller/UpdateEventPageTemplate";
import { notFound } from "next/navigation";

const UpdateSellerEventPage = async ({id}: {id: string}) => {
  const result = await getServerApiRequest(`event/get-single/${id}`)

  if(!result?.success) {
    return notFound();
  }

  const productsRes = await getServerApiRequest("product/get-form-products")

  const products = productsRes?.data ?? [];
  const event  = result?.data;

  return (
    <>
      <UpdateSellerEventPageTemplate products={products} event={event} />
    </>
  );
};

export default UpdateSellerEventPage;
