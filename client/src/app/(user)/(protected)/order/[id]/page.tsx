import OrderDetailPage from "@/components/ui/pages/OrderDetailPage";
import React from "react";

const Order =  ({ params }: { params: { id: string } }) => {
  const { id } =  params;
  return <OrderDetailPage id={id} />;
};

export default Order;
