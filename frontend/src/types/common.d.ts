import type { HTMLAttributes, ReactNode } from "react";

export type BaseProps = {
  children: React.ReactNode | string;
  className?: string;
} & HTMLAttributes<HTMLDivElement | HTMLButtonElement>;


