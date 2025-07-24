import TableShell from "@/components/Tables";
import ShopActions from "@/components/Tables/elements/shop/ShopActions";
import SellerPageWrapper from "@/components/ui/atoms/SellerPageWrapper";
import { SHOPS_ELEMENTS, SHOPS_FIELDS } from "@/constants/tables_data";
import React from "react";

const HokageShopsPageTemplate = ({data}: {data: { [key: string]: unknown }[]}) => {
  return (
    <SellerPageWrapper>
      <TableShell
        fields={SHOPS_FIELDS}
        elements={SHOPS_ELEMENTS}
        data={data}
        actions={ShopActions}
      />
    </SellerPageWrapper>
  );
};

export default HokageShopsPageTemplate;
