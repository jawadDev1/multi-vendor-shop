import CreateProductPageTemplate from "@/components/ui/templates/seller/CreateProductPageTemplate";
import { getApiRequest } from "@/utils/api";
import { useEffect, useState } from "react";

const CreateProductPage = () => {
  const [categories, setCategories] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    (async () => {
      let result = await getApiRequest("category/get-form-categories");

      setCategories(result.data);
    })();
  }, []);

  return (
    <>
      <CreateProductPageTemplate categories={categories} />
    </>
  );
};

export default CreateProductPage;
