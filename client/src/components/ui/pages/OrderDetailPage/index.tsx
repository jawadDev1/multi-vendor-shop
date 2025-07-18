import OrderDetailPageTemplate from "../../templates/OrderDetailPageTemplate";
import { getApiRequest } from "@/utils/api";
import { notFound } from "next/navigation";

const OrderDetailPage = async ({id}: {id: string}) => {
  const result = await getApiRequest(`order/order-details/${id}`);

  if (!result?.success) {
    return notFound();
  }

  const data = result?.data

  return (
    <>
      <OrderDetailPageTemplate id={id ?? ""} order={data!} />
    </>
  );
};

export default OrderDetailPage;
