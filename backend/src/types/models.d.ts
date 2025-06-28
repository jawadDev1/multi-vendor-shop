import { Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  profile: string;
  role: string;
  verified: boolean;
  zip_code: number;
  contact: number;
  address: string;
  reset_password_token: string;
  reset_password_time: Date;
}

export interface IShop extends Document {
  shop_name: string;
  logo: string;
  zip_code: number;
  contact: number;
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
