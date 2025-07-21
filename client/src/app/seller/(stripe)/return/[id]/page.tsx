import StripeReturnPage from "@/components/ui/pages/seller/StripeReturnPage";
import React from "react";

const StripeReturn = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;


  return <StripeReturnPage id={id} />;
};

export default StripeReturn;
