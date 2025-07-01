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
