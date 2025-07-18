'use client'
import SellerPageWrapper from "@/components/ui/atoms/SellerPageWrapper";
import SectionTitle from "@/components/ui/atoms/typography/SectionTitle";
import SellerUpdateForm from "@/components/ui/organisms/forms/SellerForm";
import { useShopStore } from "@/stores/shop-store";
import React from "react";

const ShopSettingsPageTemplate = () => {
  const { shop } = useShopStore();

  if (!shop) return;
  const defaultValues = {
    shop_name: shop.shop_name!,
    zip_code: shop.zip_code,
    contact: shop.contact,
    address: shop.address,
    about: shop.about,
  };

  return (
    <SellerPageWrapper >
      <SectionTitle>Update Settings</SectionTitle>

      <SellerUpdateForm
        defaultValues={defaultValues}
        logo={shop.logo}
        id={shop._id}
      />
    </SellerPageWrapper>
  );
};

export default ShopSettingsPageTemplate;
