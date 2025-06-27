import TableShell from "@/components/Tables";
import TableProductActions from "@/components/Tables/elements/products/ProdcutActions";
import PageWrapper from "@/components/ui/atoms/PageWrapper";
import { PRODUCTS_ELEMENTS, PRODUCTS_FIELDS } from "@/constants/tables_data";
import type { IAPIProduct } from "@/types/api";

interface AllProductsPageTemplateProps {
  data: IAPIProduct & { [key: string]: unknown }[];
}

const AllProductsPageTemplate = ({ data }: AllProductsPageTemplateProps) => {
  return (
    <PageWrapper>
      <TableShell
        fields={PRODUCTS_FIELDS}
        elements={PRODUCTS_ELEMENTS}
        data={data}
        actions={TableProductActions}
      />
    </PageWrapper>
  );
};

export default AllProductsPageTemplate;
