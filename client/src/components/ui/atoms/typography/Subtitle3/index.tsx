import type { BaseProps } from "@/types/common";
import cn from "@/utils/cn";

const Subtitle3 = ({ className, children, ...props }: BaseProps) => {
  return (
    <h5
      className={cn(
        " text-subtitle3-sm lg:text-subtitle3 text-charcoal",
        className
      )}
      {...props}
    >
      {children}
    </h5>
  );
};

export default Subtitle3;
