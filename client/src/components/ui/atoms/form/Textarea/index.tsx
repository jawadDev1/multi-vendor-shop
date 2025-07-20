import React from "react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";
import cn from "@/utils/cn";

type InputProps<TFieldValues extends FieldValues> = {
  className?: string;
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
} & React.InputHTMLAttributes<HTMLTextAreaElement>;

const Textarea = <TFieldValues extends FieldValues>({
  className,
  register,
  name,
  ...props
}: InputProps<TFieldValues>) => {
  return (
    <textarea
      {...register(name, {
        valueAsNumber: props?.type == "number",
      })}
      {...props}
      className={cn(
        `w-full mt-1 h-[150px] resize-none placeholder:text-light-gray text-charcoal  px-2 py-2 border border-gray-border rounded-md focus:border-blue-500 focus:outline-0`,
        className
      )}
    />
  );
};

export default Textarea;
