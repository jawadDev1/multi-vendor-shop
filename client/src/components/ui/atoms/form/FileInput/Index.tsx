import React from "react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";
import cn from "../../../../../utils/cn";

type InputProps<TFieldValues extends FieldValues> = {
  className?: string;
  register?: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
  children?: React.ReactNode | string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const FileInput = <TFieldValues extends FieldValues>({
  className,
  register,
  children,
  name,
  ...props
}: InputProps<TFieldValues>) => {
  return (
    <label
      className="w-fit px-2 py-2 cursor-pointer  bg-gray-100 text-sm text-primary block "
      htmlFor={name}
    >
      {children ?? <p>Upload a file</p>}
      <input
        type="file"
        {...(register ? register(name) : {})}
        {...props}
        className={cn(`hidden`, className)}
      />
    </label>
  );
};

export default FileInput;
