import Loader from "@/components/ui/atoms/extra/Loader";
import UpdateSellerEventPageTemplate from "@/components/ui/templates/seller/UpdateEventPageTemplate";

import { getApiRequest } from "@/utils/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const UpdateSellerEventPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState<{ label: string; value: string }[]>(
    []
  );
  const [event, setEvent] = useState(null);

  useEffect(() => {
    (async () => {
      let result = await getApiRequest("product/get-form-products");
      let productResult = await getApiRequest(`event/get-single/${id}`);

      setEvent(productResult.data);
      setProducts(result.data);
    })();
  }, []);

  if (!event) {
    return <Loader />;
  }

  return (
    <>
      <UpdateSellerEventPageTemplate products={products} event={event} />
    </>
  );
};

export default UpdateSellerEventPage;
