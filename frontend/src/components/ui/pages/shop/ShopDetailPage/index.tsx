import Loader from "@/components/ui/atoms/extra/Loader";
import ShopDetailPageTemplate from "@/components/ui/templates/shop/ShopDetailPageTemplate";
import useGetData from "@/hooks/useGetData";
import type { IAPIShopDetailsData } from "@/types/api";
import { Navigate, useParams } from "react-router";

const ShopDetailPage = () => {
  const { slug } = useParams();
  const { data, error, loading } = useGetData<IAPIShopDetailsData>({
    endpoint: `shop/get-shop-details/${slug}`,
  });

  if (loading || !data) {
    return <Loader />;
  }

  if (error) {
    return <Navigate to={"not-found"} />;
  }

  const { shop, events } = data;

  return (
    <>
      <ShopDetailPageTemplate shop={shop} events={events} />
    </>
  );
};

export default ShopDetailPage;
