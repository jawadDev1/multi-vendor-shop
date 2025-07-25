import TableShell from "@/components/Tables";
import UserOrderActions from "@/components/Tables/elements/userOrder/OrderActions";
import Loader from "@/components/ui/atoms/extra/Loader";
import {
  USER_ORDER_ELEMENTS,
  USER_ORDER_FIELDS,
} from "@/constants/user_tables_data";
import useGetData from "@/hooks/useGetData";
import type { IUserOrderTable } from "@/types/user_profile";


const OrdersSection = () => {
  const { data, error, loading } = useGetData<IUserOrderTable>({
    endpoint: "order/get-user-orders",
  });

  if (loading) return <Loader />;

  return (
    <>
      <TableShell
        fields={USER_ORDER_FIELDS}
        elements={USER_ORDER_ELEMENTS}
        data={data ?? []}
        actions={UserOrderActions}
      />
    </>
  );
};

export default OrdersSection;
