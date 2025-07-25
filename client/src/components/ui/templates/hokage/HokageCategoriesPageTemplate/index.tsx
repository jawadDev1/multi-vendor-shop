import TableShell from "@/components/Tables";
import TableCategoryActions from "@/components/Tables/elements/category/CategoryActions";
import LinkButton from "@/components/ui/atoms/buttons/LinkButton";
import SellerPageWrapper from "@/components/ui/atoms/SellerPageWrapper";
import { CATEGORIES_ELEMENTS, CATEGORIES_FIELDS,  } from "@/constants/tables_data";
import React from "react";

const HokageCategoriesPageTemplage = ({data}: {data: { [key: string]: unknown }[]}) => {
  return (
    <SellerPageWrapper>
      <div className="mb-5 flex justify-end">
        <LinkButton
        href="/hokage/categories/create"
        className="max-w-[300px] w-full shrink-0"
        >
          Create
        </LinkButton>
      </div>

      <TableShell
        fields={CATEGORIES_FIELDS}
        elements={CATEGORIES_ELEMENTS}
        data={data}
        actions={TableCategoryActions}
      />
    </SellerPageWrapper>
  );
};

export default HokageCategoriesPageTemplage;
