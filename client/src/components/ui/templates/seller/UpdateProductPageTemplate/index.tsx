import PageWrapper from "@/components/ui/atoms/PageWrapper";
import SellerPageWrapper from "@/components/ui/atoms/SellerPageWrapper";
import SectionTitle from "@/components/ui/atoms/typography/SectionTitle";
import ProductForm from "@/components/ui/organisms/forms/ProductForm";
import type { IAPIProduct } from "@/types/api";

interface UpdateProductPageTemplateProps {
  categories: { label: string; value: string }[];
  product: IAPIProduct;
}

const UpdateProductPageTemplate = ({
  categories,
  product,
}: UpdateProductPageTemplateProps) => {
  const defaultValues = {
    title: product.title,
    images: product.images,
    description: product.description,
    originalPrice: product.originalPrice,
    discount: product.discount,
    tags: product.tags,
    stock: product.stock,
    category: product.category,
  };

  return (
    <SellerPageWrapper className="px-2 lg:px-8">
      <SectionTitle className="text-center">Update Product</SectionTitle>
      <ProductForm
        categories={categories}
        defaultValues={defaultValues}
        tags={product.tags}
        slug={product.slug}
        images={product.images}
      />
    </SellerPageWrapper>
  );
};

export default UpdateProductPageTemplate;
