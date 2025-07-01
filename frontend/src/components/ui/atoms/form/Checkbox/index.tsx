import React from "react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";
import cn from "../../../../../utils/cn";

type Props<TFieldValues extends FieldValues> = {
  className?: string;
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox = <TFieldValues extends FieldValues>({
  className,
  register,
  name,
  label,
  ...props
}: Props<TFieldValues>) => {
  return (
    <>
      <label
        className={cn(
          "flex items-center gap-x-2  font-medium cursor-pointer",
          className
        )}
      >
        <input
          type="radio"
          {...register(name)}
          className="hidden peer"
          name={name}
          {...props}
        />
        <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-full border border-[#CBD0DD] peer-checked:border-4 peer-checked:bg-azure-blue peer-checked:border-azure-blue flex items-center justify-center">
          <div className="size-1 bg-white rounded-full"></div>
        </div>
        <span className="text-sm text-dim-gray font-[400]">{label}</span>
      </label>
    </>
  );
};

export default Checkbox;
