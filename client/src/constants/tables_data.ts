import TableDate from "@/components/Tables/elements/common/TableDate";
import TableDateTime from "@/components/Tables/elements/common/TableDateTime";
import TableImage from "@/components/Tables/elements/common/TableImage";
import TableSr from "@/components/Tables/elements/common/TableSr";
import TableTitle from "@/components/Tables/elements/common/TableTitle";
import TableProductImage from "@/components/Tables/elements/products/ProductImage";
import OrderId from "@/components/Tables/elements/userOrder/OrderId";
import OrderProduct from "@/components/Tables/elements/userOrder/OrderProducts";

export const PRODUCTS_FIELDS = {
  _id: "Sr#",
  title: "Title",
  originalPrice: "Price",
  images: "Image",
};

export const PRODUCTS_ELEMENTS = {
  _id: TableSr,
  title: TableTitle,
  originalPrice: TableTitle,
  images: TableProductImage,
};

export const Event_FIELDS = {
  _id: "Sr#",
  productTitle: "Title",
  productOriginalPrice: "Price",
  productImages: "Image",
  start_date: "Starting",
  end_date: "End Date",
  status: "Status",
};

export const Event_ELEMENTS = {
  _id: TableSr,
  productTitle: TableTitle,
  productOriginalPrice: TableTitle,
  productImages: TableProductImage,
  start_date: TableDateTime,
  end_date: TableDateTime,
  status: TableTitle,
};

export const COUPOUN_FIELDS = {
  _id: "Sr#",
  name: "Name",
  type: "Type",
  value: "Discount",
  min_amount: "Min amount",
  max_amount: "Max amount",
  limit: "Limit",
  createdAt: "Created on",
};

export const COUPOUN_ELEMENTS = {
  _id: TableSr,
  name: TableTitle,
  type: TableTitle,
  value: TableTitle,
  min_amount: TableTitle,
  max_amount: TableTitle,
  limit: TableTitle,
  createdAt: TableDateTime,
};

export const ORDER_FIELDS = {
  _id: "Order Id",
  status: "Status",
  cart: "Products",
  totalPrice: "Total Price",
  createdAt: "Placed On",
};

export const ORDER_ELEMENTS = {
  _id: OrderId,
  status: TableTitle,
  cart: OrderProduct,
  totalPrice: TableTitle,
  createdAt: TableDate,
};

// Admin Tables
export const SHOPS_FIELDS = {
  _id: "Sr#",
  shop_name: "Shop Name",
  logo: "Logo",
  owner: "Owner",
  email: "Email",
  totalProducts: "Total Products",
  rating: "Rating",
  totalReviews: "Total Reviews",
  createdAt: "Created On",
};

export const SHOPS_ELEMENTS = {
  _id: TableSr,
  shop_name: TableTitle,
  logo: TableImage,
  owner: TableTitle,
  email: TableTitle,
  totalProducts: TableTitle,
  rating: TableTitle,
  totalReviews: TableTitle,
  createdAt: TableDate,
};
