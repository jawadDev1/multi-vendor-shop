import TableShell from "@/components/Tables";
import SellerOrderActions from "@/components/Tables/elements/userOrder/SellerOrderActions";
import { ORDER_ELEMENTS, ORDER_FIELDS } from "@/constants/tables_data";
import type { IUserOrderTable } from "@/types/user_profile";

interface OrdersPageTemplateProps {
  data: IUserOrderTable & { [key: string]: unknown }[];
}

const OrdersPageTemplate = ({ data }: OrdersPageTemplateProps) => {
  return (
    <>
      <TableShell
        fields={ORDER_FIELDS}
        elements={ORDER_ELEMENTS}
        data={data}
        actions={SellerOrderActions}
      />
    </>
  );
};

export default OrdersPageTemplate;
