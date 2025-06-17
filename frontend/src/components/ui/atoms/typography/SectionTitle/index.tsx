import type { BaseProps } from "../../../../../types/common";
import cn from "../../../../../utils/cn";

const SectionTitle = ({ children, className, ...props }: BaseProps) => {
  return (
    <h2
      className={cn(" text-section-title-sm lg:text-section-title text-primary ", className)}
      {...props}
    >
      {children}
    </h2>
  );
};

export default SectionTitle;
