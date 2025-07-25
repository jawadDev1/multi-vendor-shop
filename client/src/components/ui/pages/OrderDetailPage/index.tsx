import { getServerApiRequest } from "@/actions/api";
import OrderDetailPageTemplate from "../../templates/OrderDetailPageTemplate";
import { notFound } from "next/navigation";

const OrderDetailPage = async ({ id }: { id: string }) => {
  const result = await getServerApiRequest(`order/order-details/${id}`);

  if (!result?.success) {
    return notFound();
  }

  const data = result?.data;

  return (
    <>
      <OrderDetailPageTemplate id={id ?? ""} order={data!} />
    </>
  );
};

export default OrderDetailPage;
