import TableDate from "@/components/Tables/elements/common/TableDate";
import TableSr from "@/components/Tables/elements/common/TableSr";
import TableTitle from "@/components/Tables/elements/common/TableTitle";
import OrderId from "@/components/Tables/elements/userOrder/OrderId";
import OrderProduct from "@/components/Tables/elements/userOrder/OrderProducts";

export const USER_ORDER_FIELDS = {
  _id: "Order Id",
  status: "Status",
  cart: "Products",
  totalPrice: "Total Price",
  createdAt: "Placed On",
};

export const USER_ORDER_ELEMENTS = {
  _id: OrderId,
  status: TableTitle,
  cart: OrderProduct,
  totalPrice: TableTitle,
  createdAt: TableDate,
};
