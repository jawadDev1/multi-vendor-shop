import ShopDetailPageTemplate from "@/components/ui/templates/shop/ShopDetailPageTemplate";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const ShopDetailPage = () => {
    const { slug } = useParams();
    const [shop, setShop] = useState(null);

    useEffect(() => {
        
    },[])

  return (
    <>
      <ShopDetailPageTemplate />
    </>
  );
};

export default ShopDetailPage;
