import type { BaseProps } from "@/types/common";
import cn from "@/utils/cn";
import React from "react";

const Subtitle2 = ({ className, children, ...props }: BaseProps) => {
  return (
    <h4
      className={cn(
        " text-subtitle2-sm lg:text-subtitle2 text-charcoal",
        className
      )}
      {...props}
    >
      {children}
    </h4>
  );
};

export default Subtitle2;
