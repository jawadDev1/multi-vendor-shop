import type { IAPIUserProduct } from "@/types/api";
import { useState } from "react";

const useHandleProductModal = () => {
  const [selectedProdcut, setSelectedProduct] =
    useState<IAPIUserProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleProduct = (product: IAPIUserProduct) => {
    toggleModal();
    setSelectedProduct(product);
  };
  return {
    selectedProdcut,
    setSelectedProduct,
    toggleModal,
    handleProduct,
    isModalOpen,
  };
};

export default useHandleProductModal;
