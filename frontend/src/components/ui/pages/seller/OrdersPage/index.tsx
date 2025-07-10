import { useAppDispatch, useAppSelector } from "@/app/hooks";
import Loader from "@/components/ui/atoms/extra/Loader";

import OrdersPageTemplate from "@/components/ui/templates/seller/OrdersPageTemplate";

import { getSellerOrders } from "@/features/seller/sellerThunk";
import { notifyError } from "@/utils/toast";
import { useEffect } from "react";

const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const { orders, error, loading } = useAppSelector((state) => state.seller);

  useEffect(() => {
    dispatch(getSellerOrders());

    if (error) {
      notifyError(error);
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <OrdersPageTemplate key={orders?.length} data={orders as any} />
    </>
  );
};

export default OrdersPage;
