
import Subtitle2 from "../../atoms/typography/Subtitle2";
import cn from "@/utils/cn";

interface CheckoutStepsProps {
  step: number;
}

const CheckoutSteps = ({ step }: CheckoutStepsProps) => {
  return (
    <div className="grid grid-cols-[28%,8%,28%,8%,26%] lg:grid-cols-[26%,10%,26%,10%,26%] max-w-[500px] mx-auto items-center ">
      <div
        className={cn("px-1 lg:px-6 py-2.5 border border-primary rounded-full", {
          "bg-primary border-transparent": step > 0,
        })}
      >
        <Subtitle2
          className={cn("text-primary", { "!text-white": step > 0 })}
        >
          1.Shipping
        </Subtitle2>
      </div>
      <div
        className={cn("w-full h-[4px] bg-primary/40 ", {
          "bg-primary": step > 1,
        })}
      />
      <div
        className={cn(" px-1 lg:px-6 py-2.5 border border-primary rounded-full", {
          "bg-primary border-transparent": step > 1,
        })}
      >
        <Subtitle2
          className={cn("text-primary", { "!text-white": step > 1 })}
        >
          2.Payment
        </Subtitle2>
      </div>
      <div
        className={cn("w-full h-[4px] bg-primary/40 ", {
          "bg-primary": step > 1,
        })}
      />
      <div
        className={cn("px-1 lg:px-6 py-2.5 border border-primary rounded-full", {
          "bg-primary border-transparent": step === 3,
        })}
      >
        <Subtitle2
          className={cn("text-primary", { "!text-white": step === 3 })}
        >
          3.Success
        </Subtitle2>
      </div>
    </div>
  );
};

export default CheckoutSteps;

