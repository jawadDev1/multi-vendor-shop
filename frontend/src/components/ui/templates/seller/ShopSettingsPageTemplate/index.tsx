import { useAppSelector } from "@/app/hooks";
import SectionTitle from "@/components/ui/atoms/typography/SectionTitle";
import SellerUpdateForm from "@/components/ui/organisms/forms/SellerForm";
import React from "react";

const ShopSettingsPageTemplate = () => {
  const { shop } = useAppSelector((state) => state.shop);

  if (!shop) return;
  const defaultValues = {
    shop_name: shop.shop_name!,
    zip_code: shop.zip_code,
    contact: shop.contact,
    address: shop.address,
    about: shop.about,
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <SectionTitle>Update Settings</SectionTitle>

      <SellerUpdateForm
        defaultValues={defaultValues}
        logo={shop.logo}
        id={shop._id}
      />
    </div>
  );
};

export default ShopSettingsPageTemplate;
