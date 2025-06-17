import React from "react";
import type { BaseProps } from "../../../../../types/common";
import cn from "../../../../../utils/cn";

const Button = ({ children, className, ...props }: BaseProps) => {
  return (
    <button
      className={cn("w-full py-2 px-4 bg-azure-blue focus:outline-none text-white rounded-md", className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
