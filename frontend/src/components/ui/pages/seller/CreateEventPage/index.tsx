import CreateEventPageTemplate from "@/components/ui/templates/seller/CreateEventPageTemplate";
import { getApiRequest } from "@/utils/api";
import { notifyError } from "@/utils/toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const CreateEventPage = () => {
  const [products, setProducts] = useState<{ label: string; value: string }[]>(
    []
  );
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      let result = await getApiRequest("product/get-form-products");

      if (result.data?.length === 0) {
        navigate("/seller/products");
        notifyError("no products available");
        return;
      }

      setProducts(result.data);
    })();
  }, []);

  return (
    <>
      <CreateEventPageTemplate products={products} />
    </>
  );
};

export default CreateEventPage;
