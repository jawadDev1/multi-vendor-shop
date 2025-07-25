import SellerPageWrapper from "@/components/ui/atoms/SellerPageWrapper";
import SectionTitle from "@/components/ui/atoms/typography/SectionTitle";
import CategoryForm from "@/components/ui/organisms/forms/CategoryForm";
import { IAPIHokageCategory } from "@/types/api";
import React from "react";

interface UpdateCategoryPageTemplateProps {
  category: IAPIHokageCategory;
}

const UpdateCategoryPageTemplate = ({category}: UpdateCategoryPageTemplateProps) => {

  const {title, image, description, _id} = category;  

  return (
    <SellerPageWrapper>
      <SectionTitle className="mb-7 md:mb-10">Update Category</SectionTitle>

      <CategoryForm defaultValues={{title, description}} image={image} id={_id} />
    </SellerPageWrapper>
  );
};

export default UpdateCategoryPageTemplate;
