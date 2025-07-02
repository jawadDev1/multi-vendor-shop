export interface IAPIUser {
  _id?: string;
  name: string;
  email: string;
  profile: string;
  verified?: boolean;
  role?: string;
}

export interface IAPIShop {
  _id?: string | null;
  slug: string;
  shop_name: string;
  contact: number;
  logo: string;
  owner?: string;
  zip_code: number;
  address?: string;
  products?: IAPIUserProduct[];
  createdAt?: string;
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

export interface IAPICoupoun {
  _id?: string | null;
  name: string;
  value: number;
  min_amount: number;
  max_amount: number;
  type: string;
  limit: number;
  products: string[];
}

export interface IAPISellerCoupounResponse extends IAPIResponse {
  data: IAPICoupoun[];
}

export interface IAPICoupoun {
  _id?: string | null;
  type: string;
  name: string;
  value: number;
  min_amount: number;
  max_amount: number;
  products: string[];
  limit: number;
}

export interface IAPICategory {
  _id?: string | null;
  title: string;
  slug: string;
}

// ======================= {{ Front end  Types }} ============================================================================

export interface IAPIUserCategory {
  title: string;
  slug: string;
  description: string;
  image: string;
}

export interface IAPIUserShop {
  shop_name: string;
  slug: string;
  about: string;
  logo: string;
  createdAt?: string;
}

export interface IAPIUserProduct {
  title: string;
  slug: string;
  description: string;
  images: string[];
  originalPrice: number;
  discount?: number;
  tags: string[];
  category: IAPIUserCategory;
  stock: number;
  sold_out?: number;
  shop?: IAPIUserShop;
}

export interface IAPIUserProductResponse extends IAPIResponse {
  data: IAPIUserProduct[];
}

export interface IAPIUserProductDetailsResponse extends IAPIResponse {
  data: { product: IAPIUserProduct; relatedProducts: IAPIUserProduct[] };
}

export interface IAPIUserEvent {
  product: IAPIUserProduct;
  start_date: string;
  end_date: string;
  status: string;
}

export interface IAPIUserPopularEventResponse extends IAPIResponse {
  data: IAPIUserEvent;
}

export interface IAPIShopDetailsData {
  shop: IAPIShop;
  events: IAPIUserEvent[];
}
