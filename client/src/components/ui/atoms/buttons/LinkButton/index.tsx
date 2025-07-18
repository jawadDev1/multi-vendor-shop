import type { BaseProps } from "@/types/common";
import cn from "@/utils/cn";
import Link from "next/link";

interface Props extends BaseProps {
  href: string;
}

const LinkButton = ({ children, className, href, ...props }: Props) => {
  return (
    <Link href={href}>
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
