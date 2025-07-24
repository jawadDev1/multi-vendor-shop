import { getServerApiRequest } from "@/actions/api";
import SellerOrderDetailPageTemplate from "@/components/ui/templates/seller/SellerOrderDetailPageTemplate";
import { notFound } from "next/navigation";

const SellerOrderDetailPage = async ({id}: {id: string}) => {
  const result = await getServerApiRequest(`order/order-details/${id}`);

  if (!result?.success) {
    return notFound();
  }

  const data = result?.data

  return (
    <>
      <SellerOrderDetailPageTemplate id={id ?? ""} order={data!} />
    </>
  );
};

export default SellerOrderDetailPage;
