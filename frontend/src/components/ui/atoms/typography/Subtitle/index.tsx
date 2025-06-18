import type { BaseProps } from "@/types/common";
import cn from "@/utils/cn";

const Subtitle = ({ className, children, ...props }: BaseProps) => {
  return (
    <h3
      className={cn(
        "text-primary text-subtitle-sm lg:text-subtitle ",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

export default Subtitle;
