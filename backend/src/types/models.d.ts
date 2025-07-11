import { Document, ObjectId, Types } from "mongoose";

export interface ICategory extends Document {
  description: string;
  image: string;
  slug: string;
  title: string;
}

export interface ICoupoun extends Document {
  created_by: string;
  limit: number;
  max_amount: number;
  min_amount: number;
  name: string;
  products: ObjectId[];
  shop: ObjectId;
  type: string;
  value: number;
}

export interface IEvent extends Document {
  end_date: Date;
  product: ObjectId;
  start_date: Date;
  status?: string;
}

export interface IOrder {
  cart: [
    {
      image: string;
      price: number;
      product: string;
      qty: number;
      shop: string;
      title: string;
    },
  ];
  shipping_address: IShippingAddress;
  payment_info: {
    id: string;
    status: string;
    type: string;
  };
  user: ObjectId;
  totalPrice: number;
  status: string;
  paid_at: Date;
  delieverd_at: Date;
  shop: ObjectId;
  refund: {
    requested: boolean;
    status: string;
    auto_refund_amount: boolean;
  };
}

export interface IProduct extends Document {
  category: ObjectId;
  created_by: string;
  description: string;
  discount?: number;
  images: string[];
  originalPrice: number;
  shop: ObjectId;
  slug: string;
  sold_out: number;
  stock: number;
  tags: string[];
  title: string;
  reviews: [
    {
      rating: number;
      comment: string;
      user: ObjectId;
    },
  ];
  rating: number;
}

export interface IShippingAddress {
  address1: string;
  address2: string;
  city: string;
  contact: number;
  country: string;
  email: string;
  name: string;
  zip_code: number;
}

export interface IShop extends Document {
  about: string;
  address: string;
  contact: number;
  logo: string;
  owner: ObjectId;
  shop_name: string;
  slug: string;
  zip_code: number;
  rating: number;
  totalReviews: number;
  totalProducts: number;
}

export interface IUser extends Document {
  addresses: Address[];
  contact: number;
  email: string;
  name: string;
  password: string;
  profile: string;
  reset_password_time: Date;
  reset_password_token: string;
  role: string;
  verified: boolean;
}

interface Address {
  _id?: Types.ObjectId;
  address1: string;
  address2: string;
  address_type: string;
  city: string;
  country: string;
  zip_code: number;
}
