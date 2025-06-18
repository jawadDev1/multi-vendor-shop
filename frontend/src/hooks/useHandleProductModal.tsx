import type { Product } from "@/constants/static";
import { useState } from "react";

const useHandleProductModal = () => {
  const [selectedProdcut, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleProduct = (product: Product) => {
    toggleModal();
    setSelectedProduct(product);
  };
  return { selectedProdcut, setSelectedProduct, toggleModal, handleProduct, isModalOpen };
};

export default useHandleProductModal;
