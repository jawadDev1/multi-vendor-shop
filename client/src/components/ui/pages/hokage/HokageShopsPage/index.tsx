import { getServerApiRequest } from "@/actions/api";
import HokageShopsPageTemplate from "@/components/ui/templates/hokage/HokageShopsPageTemplate";
import { notFound } from "next/navigation";
import React from "react";

const HokageShopsPage = async () => {
  const result = await getServerApiRequest("shop/get-all-shops");

  if (!result?.success) {
    return notFound();
  }

  const data = result.data;

  return <HokageShopsPageTemplate data={data} />;
};

export default HokageShopsPage;
