
import { getServerApiRequest } from "@/actions/api";
import Content from "@/components/ui/atoms/typography/Content";
import HokageShopRequestsPageTemplate from "@/components/ui/templates/hokage/HokageShopRequestsPageTemplate";
import HokageShopsPageTemplate from "@/components/ui/templates/hokage/HokageShopsPageTemplate";
import React from "react";

const HokageShopRequestsPage = async () => {
  const result = await getServerApiRequest("shop/requests");

  if (!result?.success) {
    return <Content>Something went wrong</Content>;
  }

  const data = result.data;

  return <HokageShopRequestsPageTemplate data={data} />;
};

export default HokageShopRequestsPage;
