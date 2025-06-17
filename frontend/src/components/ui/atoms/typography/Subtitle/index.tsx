import type { BaseProps } from "@/types/common";
import cn from "@/utils/cn";

const Subtitle = ({ className, children, ...props }: BaseProps) => {
  return (
    <h3
      className={cn(
        " text-subtitle-sm lg:text-subtitle text-primary",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

export default Subtitle;
