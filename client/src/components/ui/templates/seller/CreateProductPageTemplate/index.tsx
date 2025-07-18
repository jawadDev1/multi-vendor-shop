import SellerPageWrapper from "@/components/ui/atoms/SellerPageWrapper";
import SectionTitle from "@/components/ui/atoms/typography/SectionTitle";
import ProductForm from "@/components/ui/organisms/forms/ProductForm";


interface CreateProductPageTemplateProps {
  categories: { label: string; value: string }[];
}

const CreateProductPageTemplate = ({
  categories,
}: CreateProductPageTemplateProps) => {
  
  return (
    <SellerPageWrapper className="px-2 lg:px-8">
      <SectionTitle className="text-center">Create Product</SectionTitle>
      <ProductForm categories={categories} />
    </SellerPageWrapper>
  );
};

export default CreateProductPageTemplate;
