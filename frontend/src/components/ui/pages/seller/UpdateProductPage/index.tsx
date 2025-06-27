import Loader from "@/components/ui/atoms/extra/Loader";
import UpdateProductPageTemplate from "@/components/ui/templates/seller/UpdateProductPageTemplate";
import { getApiRequest } from "@/utils/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const UpdateProductPage = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState<
    { label: string; value: string }[]
  >([]);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (async () => {
      let result = await getApiRequest("category/get-form-categories");
      let productResult = await getApiRequest(`product/get-single/${id}`);

      setProduct(productResult.data);
      setCategories(result.data);
    })();
  }, []);

  if (!product) {
    return <Loader />;
  }

  return (
    <>
      <UpdateProductPageTemplate categories={categories} product={product} />
    </>
  );
};

export default UpdateProductPage;
