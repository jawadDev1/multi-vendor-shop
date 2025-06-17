import type { BaseProps } from "@/types/common";
import cn from "@/utils/cn";

export interface ModalWrapperProps extends BaseProps {
  isOpen: boolean;
}

const ModalWrapper = ({
  className,
  isOpen = false,
  children,
  ...props
}: ModalWrapperProps) => {
  return (
    <div
      className={cn("fixed hidden  justify-center items-center top-0 left-0 w-screen h-screen bg-black/80", {
        flex: isOpen,
      })}
    >
      <div
        className={cn(
          "w-full lg:h-full lg:max-w-[700px] lg:max-h-[600px] bg-white rounded-md",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
