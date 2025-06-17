import type { BaseProps } from "@/types/common";
import cn from "@/utils/cn";

import { Link } from "react-router";

interface Props extends BaseProps {
  to: string;
}

const LinkButton = ({ children, className, to, ...props }: Props) => {
  return (
    <Link to={to}>
      <button
        className={cn(
          "w-full py-2 px-4 bg-azure-blue focus:outline-none text-white rounded-md",
          className
        )}
        {...props}
      >
        {children}
      </button>
    </Link>
  );
};

export default LinkButton;
