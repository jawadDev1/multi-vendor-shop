import { getServerApiRequest } from "@/actions/api";
import CreateProductPageTemplate from "@/components/ui/templates/seller/CreateProductPageTemplate";

const CreateProductPage = async () => {
  const result = await getServerApiRequest('category/get-form-categories');
  const categories = result?.data ?? [];

  return (
    <>
      <CreateProductPageTemplate categories={categories} />
    </>
  );
};

export default CreateProductPage;
