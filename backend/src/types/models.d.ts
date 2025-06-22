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
