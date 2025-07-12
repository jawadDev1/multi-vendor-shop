import { useAppSelector } from "@/app/hooks";
import Loader from "@/components/ui/atoms/extra/Loader";
import DashboardPageTemplate from "@/components/ui/templates/seller/DashboardPageTemplate";
import { Navigate } from "react-router";

const DashboardPage = () => {
  const { shop, error, loading } = useAppSelector((state) => state.shop);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Navigate to={"/not-found"} />;
  }

  return (
    <>
      <DashboardPageTemplate shop={shop!} />
    </>
  );
};

export default DashboardPage;
