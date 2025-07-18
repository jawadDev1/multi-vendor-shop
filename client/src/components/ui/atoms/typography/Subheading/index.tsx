import type { BaseProps } from "@/types/common";
import cn from "@/utils/cn";

const Subheading = ({ children, className, ...props }: BaseProps) => {
  return (
    <h2
      className={cn(
        "text-primary text-subheading-sm md:text-subheading ",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
};

export default Subheading;
