
import SectionWrapper from "../../atoms/SectionWrapper";
import type { Product } from "@/constants/static";
import ProductCard from "../../molecules/Cards/ProductCard";
import Content from "../../atoms/typography/Content";
import useHandleProductModal from "@/hooks/useHandleProductModal";
import ProductDetailsModal from "../../organisms/Modals/ProductDetailsModal";

interface BestSellingPageTemplateProps {
  products: Product[];
}

const BestSellingPageTemplate = ({
  products,
}: BestSellingPageTemplateProps) => {
  const { selectedProdcut, isModalOpen, toggleModal, handleProduct } =
    useHandleProductModal();

  return (
    <>
      <ProductDetailsModal
        product={selectedProdcut}
        isOpen={isModalOpen}
        handleModal={toggleModal}
      />
      <main className="min-h-[60vh] bg-gray-50 py-8 lg:py-10">
        <SectionWrapper className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-5 lg:px-0 gap-7 lg:gap-10 ">
          {products &&
            products.length > 0 &&
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                handleProductView={handleProduct}
              />
            ))}
        </SectionWrapper>
        {products.length == 0 && (
          <Content className="text-center">No data found</Content>
        )}
      </main>
    </>
  );
};

export default BestSellingPageTemplate;
