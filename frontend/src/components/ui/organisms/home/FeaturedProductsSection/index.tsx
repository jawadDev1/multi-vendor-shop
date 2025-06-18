import SectionWrapper from "@/components/ui/atoms/SectionWrapper";

import SectionTitle from "@/components/ui/atoms/typography/SectionTitle";
import ProductCard from "@/components/ui/molecules/Cards/ProductCard";
import { PRODUCTS_DATA, type Product } from "@/constants/static";
import { useState } from "react";
import ProductDetailsModal from "../../Modals/ProductDetailsModal";

const FeaturedProductsSection = () => {
  const [selectedProdcut, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleProduct = (product: Product) => {
    toggleModal();
    setSelectedProduct(product);
  };

  return (
    <>
      <ProductDetailsModal
        product={selectedProdcut}
        isOpen={isModalOpen}
        handleModal={toggleModal}
      />
      <SectionWrapper >
        <SectionTitle className="mb-7 lg:mb-8">
          Featured
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-5 px-5 lg:px-0">
          {PRODUCTS_DATA.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleProductView={handleProduct}
            />
          ))}
        </div>
      </SectionWrapper>
    </>
  );
};

export default FeaturedProductsSection;
