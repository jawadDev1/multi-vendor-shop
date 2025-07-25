import { getServerApiRequest } from "@/actions/api";
import UpdateCategoryPageTemplate from "@/components/ui/templates/hokage/UpdateCategoryPageTemplate";
import { notFound } from "next/navigation";
import React from "react";

const UpdateCategoryPage = async ({ id }: { id: string }) => {
  const result = await getServerApiRequest(`category/category-details/${id}`);

  if (!result?.success) {
    return notFound();
  }
  const data = result?.data;

  return <UpdateCategoryPageTemplate category={data} />;
};

export default UpdateCategoryPage;
