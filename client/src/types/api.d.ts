export interface IAddress {
  _id?: string;
  country: string;
  city: string;
  address1: string;
  address2: string;
  zip_code: number;
  address_type: string;
}
export interface IAPIUser {
  _id?: string;
  name: string;
  email: string;
  profile: string;
  verified?: boolean;
  role?: string;
  contact: number;
  addresses?: IAddress[];
  updatedAt?: string;
}

export interface IAPIShopDetails {
  _id: string;
  slug: string;
  about: string;
  shop_name: string;
  contact: number;
  logo: string;
  owner?: string;
  zip_code: number;
  address: string;
  products?: IAPIUserProduct[];
  createdAt: string;
  totalProducts: number;
  totalOrders: number;
  rating: number;
  stripe_payment: {
    status: "PENDING" | "REQUESTED" | "ACTIVATED";
    account_id: string;
  };
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

export interface IAPIShopDetailsResponse extends IAPIResponse {
  data: IAPIShopDetails;
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
  shop: string;
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

export interface IAPICategoryResponse extends IAPIResponse {
  data: IAPIUserCategory[];
}

export interface IAPIUserShop {
  _id?: string;
  shop_name: string;
  slug: string;
  about: string;
  logo: string;
  createdAt?: string;
  rating: number;
  totalProducts: number;
  totalReviews: number;
}

interface IReview {
  rating: number;
  comment: string;
  user: { name: string; email?: string; profile: string };
}

export interface IAPIUserProduct {
  _id: string;
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
  rating: number;
  reviews: IReview[];
  created_by: string;
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
  shop: IAPIShopDetails;
  events: IAPIUserEvent[];
}

export type IAPIOrder = {
  _id: string;
  status: string;
  cart: [];
  totalAmount: number;
  createdAt: string;
};

export type IAPISellerConversations = {
  last_message: string | null;
  user: {
    _id: string;
    name: string;
    email: string;
    profile: string;
  };
  group_title: string;
};

export interface IAPISellerConversatoinResponse extends IAPIResponse {
  data: IAPISellerConversations[];
}

export type IAPIUserConversations = {
  last_message: string | null;
  seller: {
    _id: string;
    name: string;
    email: string;
    profile: string;
  };
  group_title: string;
};

export interface IAPIUserConversatoinResponse extends IAPIResponse {
  data: IAPIUserConversations[];
}

export interface IAPIOrdersResponse extends IAPIResponse {
  data: IAPIOrder[];
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

export interface IOrderDetail {
  cart: [
    {
      image: string;
      price: number;
      product: string;
      qty: number;
      shop: string;
      title: string;
    }
  ];
  shipping_address: IShippingAddress;
  payment_info: {
    id: string;
    status: string;
    type: string;
  };
  user: string;
  totalPrice: number;
  status: string;
  paid_at: string;
  delieverd_at: string;
  shop: string;
  createdAt: string;
}

export interface IAPIReviews {
  name: string;
  profile: string;
  rating: number;
  comment: string;
}
