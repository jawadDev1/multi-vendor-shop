import TableDate from "@/components/Tables/elements/common/TableDate";
import TableSr from "@/components/Tables/elements/common/TableSr";
import TableTitle from "@/components/Tables/elements/common/TableTitle";
import TableProductImage from "@/components/Tables/elements/products/ProductImage";

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
  start_date: TableDate,
  end_date: TableDate,
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
  createdAt: TableDate,
};
