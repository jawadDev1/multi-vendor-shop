import type { BaseProps } from "@/types/common";
import cn from "@/utils/cn";


const SectionWrapper = ({ className, children, ...props }: BaseProps) => {
  return (
    <section className={cn("max-w-[1200px] mx-auto ", className)} {...props}>
      {children}
    </section>
  );
};

export default SectionWrapper;
