import SectionWrapper from "@/components/ui/atoms/SectionWrapper";
import SectionTitle from "@/components/ui/atoms/typography/SectionTitle";
import ProductCard from "@/components/ui/molecules/Cards/ProductCard";
import type { Product } from "@/constants/static";
import useHandleProductModal from "@/hooks/useHandleProductModal";
import React from "react";
import ProductDetailsModal from "../../Modals/ProductDetailsModal";

interface RelatedProductsSectionProps {
  products: Product[] | null;
}

const RelatedProductsSection = ({ products }: RelatedProductsSectionProps) => {
  const { handleProduct, isModalOpen, selectedProdcut, toggleModal } =
    useHandleProductModal();

  return (
    <>
      <ProductDetailsModal
        product={selectedProdcut}
        isOpen={isModalOpen}
        handleModal={toggleModal}
      />
      <SectionWrapper>
        <SectionTitle className="mb-4 lg:mb-5">Related Product</SectionTitle>

        {products && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
            {products.map((product) => (
              <ProductCard
                product={product}
                handleProductView={() => handleProduct(product)}
              />
            ))}
          </div>
        )}
      </SectionWrapper>
    </>
  );
};

export default RelatedProductsSection;
