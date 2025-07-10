import type { BaseProps } from "@/types/common";
import cn from "@/utils/cn";

const Title = ({ className, children, ...props }: BaseProps) => {
  return (
    <h3
      className={cn(
        "text-primary text-title-sm lg:text-title ",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

export default Title;
