import SectionWrapper from "@/components/ui/atoms/SectionWrapper";

import SectionTitle from "@/components/ui/atoms/typography/SectionTitle";
import ProductCard from "@/components/ui/molecules/Cards/ProductCard";
import { PRODUCTS_DATA } from "@/constants/static";

import ProductDetailsModal from "../../Modals/ProductDetailsModal";
import useHandleProductModal from "@/hooks/useHandleProductModal";

const BestDealsSection = () => {
  const { selectedProdcut, isModalOpen, toggleModal, handleProduct } =
    useHandleProductModal();

  return (
    <>
      <ProductDetailsModal
        product={selectedProdcut}
        isOpen={isModalOpen}
        handleModal={toggleModal}
      />
      <SectionWrapper>
        <SectionTitle className="mb-7 lg:mb-8">Best Deals</SectionTitle>
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

export default BestDealsSection;
