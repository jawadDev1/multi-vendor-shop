import { getServerApiRequest } from "@/actions/api";
import Content from "@/components/ui/atoms/typography/Content";
import HokageShopsPageTemplate from "@/components/ui/templates/hokage/HokageShopsPageTemplate";
import { notFound } from "next/navigation";
import React from "react";

const HokageShopsPage = async () => {
  const result = await getServerApiRequest("shop/get-all-shops");

  if (!result?.success) {
    return <Content>Something went wrong</Content>;
  }

  const data = result.data;

  return <HokageShopsPageTemplate data={data} />;
};

export default HokageShopsPage;
