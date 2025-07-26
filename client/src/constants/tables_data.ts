import TableDate from "@/components/Tables/elements/common/TableDate";
import TableDateTime from "@/components/Tables/elements/common/TableDateTime";
import TableImage from "@/components/Tables/elements/common/TableImage";
import TableSr from "@/components/Tables/elements/common/TableSr";
import TableTitle from "@/components/Tables/elements/common/TableTitle";
import TableProductDiscount from "@/components/Tables/elements/products/ProdcutDiscount";
import TableProductImage from "@/components/Tables/elements/products/ProductImage";
import TableProductStock from "@/components/Tables/elements/products/ProductStock";
import TableShopStatus from "@/components/Tables/elements/shop/ShopStatus";
import OrderId from "@/components/Tables/elements/userOrder/OrderId";
import OrderProduct from "@/components/Tables/elements/userOrder/OrderProducts";

export const PRODUCTS_FIELDS = {
  _id: "Sr#",
  title: "Title",
  images: "Image",
  originalPrice: "Original Price",
  discount: "Discount",
  stock: "Stock",
  sold_out: "Sold",
  rating: "Rating",
};

export const PRODUCTS_ELEMENTS = {
  _id: TableSr,
  title: TableTitle,
  images: TableProductImage,
  originalPrice: TableTitle,
  discount: TableProductDiscount,
  stock: TableProductStock,
  sold_out: TableTitle,
  rating: TableTitle,
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

export const SHOP_REQUEST_FIELDS = {
  _id: "Sr#",
  shop_name: "Shop Name",
  logo: "Logo",
  owner: "Owner",
  email: "Email",
  request_status: "Status",
  createdAt: "Request On",
};

export const SHOP_REQUEST_ELEMENTS = {
  _id: TableSr,
  shop_name: TableTitle,
  logo: TableImage,
  owner: TableTitle,
  email: TableTitle,
  request_status: TableShopStatus,
  createdAt: TableDate,
};

export const USERS_FIELDS = {
  _id: "Sr#",
  name: "Name",
  email: "Email",
  profile: "Profile",
  role: "Role",
  // orders: "Orders",
  createdAt: "Joined On",
};

export const USERS_ELEMENTS = {
  _id: TableSr,
  name: TableTitle,
  email: TableTitle,
  profile: TableImage,
  role: TableTitle,
  // orders: TableTitle,
  createdAt: TableDate,
};

export const CATEGORIES_FIELDS = {
  _id: "Sr#",
  title: "Title",
  image: "Image",
  totalProducts: "Total Products",
  createdAt: "Created On",
};

export const CATEGORIES_ELEMENTS = {
  _id: TableSr,
  title: TableTitle,
  image: TableImage,
  totalProducts: TableTitle,
  createdAt: TableDate,
};
