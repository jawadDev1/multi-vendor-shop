import React from "react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";
import cn from "../../../../../utils/cn";

type InputProps<TFieldValues extends FieldValues> = {
  className?: string;
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
  options: { label: string; value: string }[];
} & React.InputHTMLAttributes<HTMLSelectElement>;

const Select = <TFieldValues extends FieldValues>({
  className,
  register,
  name,
  options,
  ...props
}: InputProps<TFieldValues>) => {
  return (
    <select
      {...register(name)}
      {...props}
      className={cn(
        `w-full mt-1 h-[44px] bg-white text-primary lg:h-[45px] px-2 py-2 border border-gray-border rounded-md focus:border-blue-500 focus:outline-0`,
        className
      )}
    >
      {options &&
        options.length > 0 &&
        options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
    </select>
  );
};

export default Select;
