import { getServerApiRequest } from "@/actions/api";
import CreateEventPageTemplate from "@/components/ui/templates/seller/CreateEventPageTemplate";

const CreateEventPage = async () => {
  const result = await getServerApiRequest("product/get-form-products")

  const products = result?.data ?? [];

  return (
    <>
      <CreateEventPageTemplate products={products} />
    </>
  );
};

export default CreateEventPage;
