import SellerOrderDetailPage from "@/components/ui/pages/seller/SellerOrderDetailPage";
import React from "react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const OrderDetail = async ({ params }: any) => {
  const { id } = await params;
  return <SellerOrderDetailPage id={id} />;
};

export default OrderDetail;
