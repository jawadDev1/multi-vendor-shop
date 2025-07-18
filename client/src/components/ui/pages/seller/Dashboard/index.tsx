'use client';
import DashboardPageTemplate from "@/components/ui/templates/seller/DashboardPageTemplate";
import { useShopStore } from "@/stores/shop-store";

const DashboardPage = () => {
  const { shop } = useShopStore() 

 

  return (
    <>
      <DashboardPageTemplate shop={shop!} />
    </>
  );
};

export default DashboardPage;
