export interface IAPIUser {
  name: string;
  email: string;
  profile: string;
  verified?: boolean;
  role?: string;
}

export interface IAPIShop {
  _id?: string | null;
  shop_name: string;
  contact: number;
  logo: string;
  zip_code: number;
  address?: string;
}

export interface IAPIProduct {
  _id?: string | null;
  title: string;
  slug: string;
  description: string;
  images: string[];
  originalPrice: number;
  discount?: number;
  tags: string[];
  category: string;
  stock: number;
}

export interface IAPIResponse {
  success: boolean;
  message: string;
}

export interface IAPIUserResponse extends IAPIResponse {
  data: IAPIUser;
}

export interface IAPIShopResponse extends IAPIResponse {
  data: IAPIShop;
}

export interface IAPIProductResponse extends IAPIResponse {
  data: IAPIProduct[];
}

export interface IAPISellerEvent {
  _id?: string | null;
  status: string;
  productTitle: string;
  start_date: string;
  end_date: string;
  productImages: string[];
  productOriginalPrice: number;
  productDiscount?: number;
  productStock: number;
  createdAt?: string;
}

export interface IAPISellerEventsResponse extends IAPIResponse {
  data: IAPISellerEvent[];
}
