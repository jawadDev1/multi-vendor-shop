import type { HTMLAttributes, ReactNode } from "react";

export type BaseProps = {
  children: React.ReactNode | string;
  className?: string;
} & HTMLAttributes<HTMLDivElement | HTMLButtonElement>;

export interface ITableData<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  data: T[];
}

export interface ISelectOptions {
  label: string;
  value: string;
}

export interface ICartItem {
  id: string;
  title: string;
  slug?: string;
  price: number;
  qty: number;
  stock: number;
  image: string;
  discount: number;
}

export interface IWishlistItem {
  id: string;
  title: string;
  slug?: string;
  price: number;
  image: string;
  discount: number;
}
