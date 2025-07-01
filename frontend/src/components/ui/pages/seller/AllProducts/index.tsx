import { useAppDispatch, useAppSelector } from "@/app/hooks";
import Loader from "@/components/ui/atoms/extra/Loader";
import AllProductsPageTemplate from "@/components/ui/templates/seller/AllProductsPageTemplate";
import { getProducts } from "@/features/seller/sellerThunk";
import { notifyError } from "@/utils/toast";
import { useEffect } from "react";

const AllProductsPage = () => {
  const dispatch = useAppDispatch();
  const { products, error, loading } = useAppSelector((state) => state.seller);

  useEffect(() => {
    dispatch(getProducts());

    if (error) {
      notifyError(error);
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <AllProductsPageTemplate key={products?.length} data={products as any} />
    </>
  );
};

export default AllProductsPage;
