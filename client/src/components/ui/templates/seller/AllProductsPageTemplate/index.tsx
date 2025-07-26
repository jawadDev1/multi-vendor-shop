import TableShell from "@/components/Tables";
import TableProductActions from "@/components/Tables/elements/products/ProdcutActions";
import SellerPageWrapper from "@/components/ui/atoms/SellerPageWrapper";
import { PRODUCTS_ELEMENTS, PRODUCTS_FIELDS } from "@/constants/tables_data";
import type { IAPIProduct } from "@/types/api";

interface AllProductsPageTemplateProps {
  data: IAPIProduct & { [key: string]: unknown }[];
}

const AllProductsPageTemplate = ({ data }: AllProductsPageTemplateProps) => {
  return (
    <SellerPageWrapper>
      <TableShell
        fields={PRODUCTS_FIELDS}
        elements={PRODUCTS_ELEMENTS}
        data={data}
        actions={TableProductActions}
      />
    </SellerPageWrapper>
  );
};

export default AllProductsPageTemplate;
