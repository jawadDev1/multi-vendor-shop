import type { BaseProps } from "@/types/common";
import cn from "@/utils/cn";

const PageWrapper = ({ children, className, ...props }: BaseProps) => {
  return (
    <main className="bg-gray-50 py-7 lg:py-10 min-h-[60vh]" {...props}>
      <div className={cn("max-w-[1200px] mx-auto ", className)}>{children}</div>
    </main>
  );
};

export default PageWrapper;
