import Content from "@/components/ui/atoms/typography/Content";
import Subtitle2 from "@/components/ui/atoms/typography/Subtitle2";
import Title from "@/components/ui/atoms/typography/Title";
import type { IAPIShopDetails } from "@/types/api";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { FaJediOrder } from "react-icons/fa";
import { GiBorderedShield } from "react-icons/gi";
import { Link } from "react-router";

interface DashboardPageTemplateProps {
  shop: IAPIShopDetails;
}

const DashboardPageTemplate = ({ shop }: DashboardPageTemplateProps) => {
  if (!shop) return;

  const { totalOrders, totalProducts } = shop;

  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-md shadow-xl py-4 px-4 ">
          <div className="flex items-center gap-3">
            <AiOutlineMoneyCollect size={30} className="text-charcoal-gray" />
            <Content>Account Balance (with 10% service charge)</Content>
          </div>
          <Title className="ml-3">$100</Title>
          <Link to={"withdraw-money"}>
            <Subtitle2 className="text-azure-blue">Withdraw money</Subtitle2>
          </Link>
        </div>

        <div className="bg-white rounded-md shadow-xl py-4 px-4 ">
          <div className="flex items-center gap-3 min-h-[52px] ">
            <FaJediOrder size={30} className="text-charcoal-gray" />
            <Content>Orders</Content>
          </div>
          <Title className="ml-3">{totalOrders}</Title>
          <Link to={"orders"}>
            <Subtitle2 className="text-azure-blue">View orders</Subtitle2>
          </Link>
        </div>

        <div className="bg-white rounded-md shadow-xl py-4 px-4 ">
          <div className="flex items-center gap-3 min-h-[52px] ">
            <GiBorderedShield size={30} className="text-charcoal-gray" />
            <Content>Products</Content>
          </div>
          <Title className="ml-3">{totalProducts}</Title>
          <Link to={"products"}>
            <Subtitle2 className="text-azure-blue">View products</Subtitle2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPageTemplate;
