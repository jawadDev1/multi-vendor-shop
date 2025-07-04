import { Document, ObjectId } from "mongoose";

interface Address {
  country: string;
  city: string;
  address1: string;
  address2: string;
  zip_code: number;
  address_type: string;
}
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  profile: string;
  role: string;
  verified: boolean;
  contact: number;
  addresses: Address;
  reset_password_token: string;
  reset_password_time: Date;
}

export interface IShop extends Document {
  shop_name: string;
  logo: string;
  slug: string;
  zip_code: number;
  contact: number;
  about: string;
  address: string;
  owner: ObjectId;
}

export interface IProduct extends Document {
  title: string;
  slug: string;
  description: string;
  images: string[];
  tags: string[];
  originalPrice: number;
  discount?: number;
  stock: number;
  sold_out: number;
  shop: ObjectId;
  category: ObjectId;
  created_by: string;
}

export interface ICategory extends Document {
  title: string;
  slug: string;
  description: string;
  image: string;
}

export interface IEvent extends Document {
  product: ObjectId;
  start_date: Date;
  end_date: Date;
  status?: string;
}

export interface ICoupoun extends Document {
  type: string;
  name: string;
  value: number;
  min_amount: number;
  max_amount: number;
  products: ObjectId[];
  created_by: string;
  limit: number;
}
