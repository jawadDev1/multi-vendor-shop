import type { BaseProps } from "@/types/common";
import cn from "@/utils/cn";

const PageWrapper = ({ children, className, ...props }: BaseProps) => {
  return (
    <main
      className={cn("bg-gray-100/50 py-7 lg:py-10 min-h-[60vh]", className)}
      {...props}
    >
      {children}
    </main>
  );
};

export default PageWrapper;
