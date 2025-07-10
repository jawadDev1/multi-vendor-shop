export type IUserOrderTable = {
  _id: string;
  status: string;
  cart: [];
  totalAmount: number;
  createdAt: string;
} & { [key: string]: unknown }[];
