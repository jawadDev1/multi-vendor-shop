import PageWrapper from "@/components/ui/atoms/PageWrapper";
import SectionTitle from "@/components/ui/atoms/typography/SectionTitle";
import ProductForm from "@/components/ui/organisms/forms/ProductForm";


interface CreateProductPageTemplateProps {
  categories: { label: string; value: string }[];
}

const CreateProductPageTemplate = ({
  categories,
}: CreateProductPageTemplateProps) => {
  
  return (
    <PageWrapper className="px-2 lg:px-8">
      <SectionTitle className="text-center">Create Product</SectionTitle>
      <ProductForm categories={categories} />
    </PageWrapper>
  );
};

export default CreateProductPageTemplate;
