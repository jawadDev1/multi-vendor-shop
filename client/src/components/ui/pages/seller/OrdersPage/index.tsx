"use client";
import SellerPageWrapper from "@/components/ui/atoms/SellerPageWrapper";

import OrdersPageTemplate from "@/components/ui/templates/seller/OrdersPageTemplate";
import { useShopStore } from "@/stores/shop-store";
import { IAPIOrder } from "@/types/api";
import { getApiRequest } from "@/utils/api";

import { useEffect, useState } from "react";

const OrdersPage = () => {
  const { shop } = useShopStore();
  const [orders, setOrders] = useState<IAPIOrder[]>([]);

  
 useEffect(() => {
  if(shop?._id) {
    (async () => {
      const result = await getApiRequest( `order/get-seller-orders/${shop?._id}`);
      if(result?.success) {
        setOrders(result?.data)
      }
    })()
  }

 }, [shop?._id]) 

  return (
    <>
      <SellerPageWrapper>
        <OrdersPageTemplate key={orders?.length} data={orders as any} />
      </SellerPageWrapper>
    </>
  );
};

export default OrdersPage;
