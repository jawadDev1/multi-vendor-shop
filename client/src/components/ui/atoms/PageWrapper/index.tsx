import type { BaseProps } from "@/types/common";
import cn from "@/utils/cn";

const PageWrapper = ({ children, className, ...props }: BaseProps) => {
  return (
    <main className={cn("bg-gray-bg py-7 lg:py-10 min-h-[60vh]")} {...props}>
      <div className={cn('max-w-[1200px] mx-auto px-5 lg:px-1', className)}>{children}</div>
    </main>
  );
};

export default PageWrapper;
