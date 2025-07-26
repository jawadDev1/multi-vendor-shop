import { getServerApiRequest } from "@/actions/api";
import Content from "@/components/ui/atoms/typography/Content";
import HokageCategoriesPageTemplage from "@/components/ui/templates/hokage/HokageCategoriesPageTemplate";
import React from "react";

const HokageCategoriesPage = async () => {
  const result = await getServerApiRequest("category/get-categories");

  if (!result?.success) {
    return <Content>Something went wrong</Content>;
  }

  const data = result.data;

  return <HokageCategoriesPageTemplage data={data} />;
};

export default HokageCategoriesPage;
