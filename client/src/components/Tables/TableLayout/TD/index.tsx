import type { BaseProps } from "@/types/common";
import cn from "@/utils/cn";

const TD = ({ children, className, ...props }: BaseProps) => {
  return (
    <td className={cn("px-3 py-2", className)} {...props}>
      {children}
    </td>
  );
};

export default TD;
