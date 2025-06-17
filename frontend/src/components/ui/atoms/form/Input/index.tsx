import React from "react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";
import cn from "../../../../../utils/cn";

type InputProps<TFieldValues extends FieldValues> = {
  className?: string;
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = <TFieldValues extends FieldValues>({
  className,
  register,
  name,
  ...props
}: InputProps<TFieldValues>) => {
  return (
    <input
      {...register(name)}
      {...props}
      className={cn(
        `w-full mt-1 h-[44px] placeholder:text-light-gray text-primary lg:h-[45px] px-2 py-2 border border-gray-border rounded-md focus:border-blue-500 focus:outline-0`,
        className
      )}
    />
  );
};

export default Input;
