import type { BaseButtonProps, BaseProps } from "@/types/common";
import Spinner from "../../extra/Spinner";
import cn from "@/utils/cn";

interface Props extends BaseButtonProps {
  isLoading: boolean;
}

const SpinnerButton = ({ isLoading, className, children, ...props }: Props) => {
  return (
    <button
      className={cn(
        "w-full py-2 px-4 bg-primary focus:outline-none text-white rounded-md",
        className
      )}
      {...props}
    >
      {isLoading ? <Spinner className="border-white" /> : children}
    </button>
  );
};

export default SpinnerButton;
