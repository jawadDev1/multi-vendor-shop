import { getServerApiRequest } from "@/actions/api";
import Content from "@/components/ui/atoms/typography/Content";
import HokageDashboardPageTemplate from "@/components/ui/templates/hokage/HokageDashboardPageTemplate";
import React from "react";

const HokageDashboardPage = async () => {
  const result = await getServerApiRequest("shop/hokage/states");

  if (!result?.success) {
    return <Content>Something went wrong</Content>;
  }

  const data = result?.data;

  return (
    <>
      <HokageDashboardPageTemplate shop={data} />
    </>
  );
};

export default HokageDashboardPage;
