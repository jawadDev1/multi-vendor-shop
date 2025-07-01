import SectionWrapper from "@/components/ui/atoms/SectionWrapper";

import SectionTitle from "@/components/ui/atoms/typography/SectionTitle";
import ProductCard from "@/components/ui/molecules/Cards/ProductCard";
import { PRODUCTS_DATA } from "@/constants/static";

import ProductDetailsModal from "../../Modals/ProductDetailsModal";
import useHandleProductModal from "@/hooks/useHandleProductModal";
import useGetData from "@/hooks/useGetData";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { loadBestDeals } from "@/features/product/productThunk";

const BestDealsSection = () => {
  const { selectedProdcut, isModalOpen, toggleModal, handleProduct } =
    useHandleProductModal();
  const { best_deals } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!best_deals || best_deals?.length == 0) {
      dispatch(loadBestDeals());
    }
  }, []);

  console.log("b ======> ", best_deals);

  return (
    <>
      <ProductDetailsModal
        product={selectedProdcut}
        isOpen={isModalOpen}
        handleModal={toggleModal}
      />
      <SectionWrapper>
        <SectionTitle className="mb-7 lg:mb-8">Best Deals</SectionTitle>
        {best_deals && best_deals.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-5 px-5 lg:px-0">
            {best_deals.map((product) => (
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

export default BestDealsSection;
