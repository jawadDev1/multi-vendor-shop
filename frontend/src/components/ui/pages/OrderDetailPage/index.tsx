import useGetData from "@/hooks/useGetData";
import OrderDetailPageTemplate from "../../templates/OrderDetailPageTemplate";
import { Navigate, useParams } from "react-router";
import Loader from "../../atoms/extra/Loader";
import type { IOrderDetail } from "@/types/api";

const OrderDetailPage = () => {
  const { id } = useParams();

  const { data, loading, error } = useGetData<IOrderDetail>({
    endpoint: `order/order-details/${id}`,
  });

  if (loading) return <Loader />;

  if (error && !data) {
    return <Navigate to={"/not-found"} />;
  }

  return (
    <>
      <OrderDetailPageTemplate id={id ?? ""} order={data!} />
    </>
  );
};

export default OrderDetailPage;
