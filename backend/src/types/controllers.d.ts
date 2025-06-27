import { ObjectId } from "mongoose";

export interface IUserBody {
  name: string;
  email: string;
  password: string;
  profile: string;
}

export interface IShopBody {
  shop_name: string;
  logo: string;
  contact: number;
  zip_code: number;
  address: string;
}

export interface IProductBody {
  title: string;
  description: string;
  discount?: number;
  originalPrice: number;
  images: string[];
  category: ObjectId;
  stock: number;
  tags: string[];
}
