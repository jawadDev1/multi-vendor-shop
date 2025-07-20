import type { BaseButtonProps } from "../../../../../types/common";
import cn from "../../../../../utils/cn";

const Button = ({ children, className, ...props }: BaseButtonProps) => {
  return (
    <button
      className={cn(
        "w-full py-2 px-4 bg-orange-gradient focus:outline-none text-white rounded-md",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
