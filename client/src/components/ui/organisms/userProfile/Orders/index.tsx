import TableShell from "@/components/Tables";
import UserOrderActions from "@/components/Tables/elements/userOrder/OrderActions";
import Loader from "@/components/ui/atoms/extra/Loader";
import Table from "@/components/ui/molecules/Table";
import {
  USER_ORDER_ELEMENTS,
  USER_ORDER_FIELDS,
} from "@/constants/user_tables_data";
import useGetData from "@/hooks/useGetData";
import type { IUserOrderTable } from "@/types/user_profile";

const FIELDS = [
  { title: "Order ID" },
  { title: "Status" },
  { title: "Items Quantity" },
  { title: "Total" },
];

const DATA = [
  {
    name: 'Apple MacBook Pro 17"',
    color: "Silver",
    category: "Laptop",
    price: "$2999",
  },
  {
    name: "Microsoft Surface Pro",
    color: "White",
    category: "Laptop PC",
    price: "$1999",
  },
];

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
