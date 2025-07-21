import StripeRefreshPage from "@/components/ui/pages/seller/StripeRefreshPage";
import React from "react";

const StripeRefresh = async ({params}: {params: {id: string}}) => {
  const { id } = await params;

  return (
    <>
        <StripeRefreshPage connectedAccountId={id} />
    </>
  );

};

export default StripeRefresh;
