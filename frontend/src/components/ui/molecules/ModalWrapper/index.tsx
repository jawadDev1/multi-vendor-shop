import type { BaseProps } from "@/types/common";
import cn from "@/utils/cn";
import { useEffect } from "react";

export interface ModalWrapperProps extends BaseProps {
  isOpen: boolean;
  parentClassName?: string;
}

const ModalWrapper = ({
  className,
  isOpen = false,
  children,
  parentClassName,
  ...props
}: ModalWrapperProps) => {

  useEffect(() => {
    if(window) {
      const body = document.getElementById('body');
      if(body) {
        body.style.overflowY = isOpen ? 'hidden' : 'scroll';
      }

    }
  }, [isOpen])
  

  return (
    <div
      className={cn(
        "z-30 fixed hidden  justify-center items-center top-0 left-0 w-screen h-screen bg-black/80",
        {
          flex: isOpen,
        },
        parentClassName
      )}
    >
      <div
        className={cn(
          "w-full max-h-[90vh] h-full lg:max-w-[700px] lg:max-h-[600px] bg-white rounded-md",
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
