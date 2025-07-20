import type { BaseProps } from "@/types/common";
import cn from "@/utils/cn";

const CardTitle = ({ className, children, ...props }: BaseProps) => {
  return (
    <h5
      className={cn(
        " text-card-title-sm md:text-card-title text-charcoal",
        className
      )}
      {...props}
    >
      {children}
    </h5>
  );
};

export default CardTitle;
