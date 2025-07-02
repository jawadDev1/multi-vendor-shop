import SectionWrapper from "@/components/ui/atoms/SectionWrapper";

import SectionTitle from "@/components/ui/atoms/typography/SectionTitle";
import ProductCard from "@/components/ui/molecules/Cards/ProductCard";
import { PRODUCTS_DATA, type Product } from "@/constants/static";
import { useEffect, useState } from "react";
import ProductDetailsModal from "../../Modals/ProductDetailsModal";
import { loadFeaturedProducts } from "@/features/product/productThunk";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import type { IAPIUserProduct } from "@/types/api";

const FeaturedProductsSection = () => {
  const [selectedProdcut, setSelectedProduct] =
    useState<IAPIUserProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleProduct = (product: IAPIUserProduct) => {
    toggleModal();
    setSelectedProduct(product);
  };

  const { featured_products } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!featured_products || featured_products?.length == 0) {
      dispatch(loadFeaturedProducts());
    }
  }, []);

  return (
    <>
      <ProductDetailsModal
        product={selectedProdcut}
        isOpen={isModalOpen}
        handleModal={toggleModal}
      />
      <SectionWrapper>
        <SectionTitle className="mb-7 lg:mb-8">Featured</SectionTitle>
        {featured_products && featured_products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-5 px-5 lg:px-0">
            {featured_products.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                handleProductView={handleProduct}
              />
            ))}
          </div>
        )}
      </SectionWrapper>
    </>
  );
};

export default FeaturedProductsSection;
