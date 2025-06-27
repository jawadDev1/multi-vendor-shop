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
