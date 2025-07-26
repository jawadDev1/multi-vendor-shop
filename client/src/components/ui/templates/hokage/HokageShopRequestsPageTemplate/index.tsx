import TableShell from "@/components/Tables";
import ShopRequestsActions from "@/components/Tables/elements/shop/ShopRequestActions";
import SellerPageWrapper from "@/components/ui/atoms/SellerPageWrapper";
import ShopRequestReviewModal from "@/components/ui/organisms/Modals/ShopRequestViewModal";
import {
  SHOP_REQUEST_ELEMENTS,
  SHOP_REQUEST_FIELDS,
} from "@/constants/tables_data";
import React from "react";

const HokageShopRequestsPageTemplate = ({
  data,
}: {
  data: { [key: string]: unknown }[];
}) => {
  return (
    <>
      <SellerPageWrapper>
        <TableShell
          fields={SHOP_REQUEST_FIELDS}
          elements={SHOP_REQUEST_ELEMENTS}
          data={data}
          actions={ShopRequestsActions}
        />
      </SellerPageWrapper>
      <ShopRequestReviewModal />
    </>
  );
};

export default HokageShopRequestsPageTemplate;
