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

export interface IEventBody {
  start_date: Date;
  end_date: Date;
  product: ObjectId;
}

export interface ICoupounBody {
  name: string;
  value: number;
  min_amount: number;
  max_amount: number;
  limit: number;
  type: string;
  products?: ObjectId[];
}

export interface ICategoryBody {
  _id?: ObjectId;
  title: string;
  description: number;
  slug: number;
  image: string;
}

I;

export type IPopulatedProduct = Omit<IProduct, "category" | "shop"> & {
  category: ICategoryBody;
  shop: IShop;
};
