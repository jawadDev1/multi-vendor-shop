import SellerPageWrapper from "@/components/ui/atoms/SellerPageWrapper";
import Content from "@/components/ui/atoms/typography/Content";
import Subtitle from "@/components/ui/atoms/typography/Subtitle";
import Subtitle2 from "@/components/ui/atoms/typography/Subtitle2";
import Title from "@/components/ui/atoms/typography/Title";
import DoughnutChart from "@/components/ui/molecules/charts/DoughnutChart";
import Link from "next/link";
import { FaJediOrder } from "react-icons/fa";
import { GiBorderedShield } from "react-icons/gi";

interface DashboardPageTemplateProps {
  shop: {
    totalProducts: number;
    inStockProducts: number;
    outOfStockProducts: number;
    totalOrders: number;
    processingOrders: number;
    deliveredOrders: number;
    shippedOrders: number;
  };
}

const DashboardPageTemplate = ({ shop }: DashboardPageTemplateProps) => {
  if (!shop) return;

  const {
    totalOrders,
    totalProducts,
    shippedOrders,
    deliveredOrders,
    inStockProducts,
    outOfStockProducts,
    processingOrders,
  } = shop;

  const productbackgroundColors = ["#002626", "#F64545"];
  const productChartLabels = ["In Stock", "Out of Stock"];
  const productChartData = [inStockProducts, outOfStockProducts];

  const orderBackgroundColors = ["#33CA7F", "#002626", "#FF8A65"];
  const orderChartLabels = ["Processing", "Shipped", "Delivered"];
  const orderChartData = [processingOrders, shippedOrders, deliveredOrders];

  return (
    <SellerPageWrapper>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-md shadow-xl py-4 px-4 ">
          <div className="flex items-center gap-3 min-h-[52px] ">
            <FaJediOrder size={30} className="text-charcoal-gray" />
            <Content>Orders</Content>
          </div>
          <Title className="ml-3">{totalOrders}</Title>
          <Link href={"orders"}>
            <Subtitle2 className="text-azure-blue">View orders</Subtitle2>
          </Link>
        </div>

        <div className="bg-white rounded-md shadow-xl py-4 px-4 ">
          <div className="flex items-center gap-3 min-h-[52px] ">
            <GiBorderedShield size={30} className="text-charcoal-gray" />
            <Content>Products</Content>
          </div>
          <Title className="ml-3">{totalProducts}</Title>
          <Link href={"products"}>
            <Subtitle2 className="text-azure-blue">View products</Subtitle2>
          </Link>
        </div>
      </div>

      <div className="w-full mt-8 md:mt-16 grid grid-cols-2 gap-3">
        { inStockProducts || outOfStockProducts ? (
          <div>
            <Subtitle className="">Products States</Subtitle>
            <DoughnutChart
              labels={productChartLabels}
              data={productChartData}
              backgroundColors={productbackgroundColors}
            />
          </div>
        ) : (
          ""
        )}
        {processingOrders || shippedOrders || deliveredOrders ? (
          <div>
            <Subtitle>Orders States</Subtitle>
            <DoughnutChart
              labels={orderChartLabels}
              data={orderChartData}
              backgroundColors={orderBackgroundColors}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </SellerPageWrapper>
  );
};

export default DashboardPageTemplate;
