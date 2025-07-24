import type { BaseProps } from "@/types/common";
import cn from "@/utils/cn";

const SellerPageWrapper = ({ children, className, ...props }: BaseProps) => {
  return (
    <main className={cn("bg-white px-5 py-7 lg:py-7 min-h-[60vh] max-h-[87vh] shadow-xl overflow-y-auto")} {...props}>
      <div className={cn('max-w-[98%] mx-auto ', className)}>{children}</div>
    </main>
  );
};

export default SellerPageWrapper;
