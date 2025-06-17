import React from "react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";
import cn from "../../../../../utils/cn";

type InputProps<TFieldValues extends FieldValues> = {
  className?: string;
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
} & React.InputHTMLAttributes<HTMLInputElement>;

const FileInput = <TFieldValues extends FieldValues>({
  className,
  register,
  name,
  ...props
}: InputProps<TFieldValues>) => {
  return (
    <label className="w-fit px-2 py-2 cursor-pointer rounded-md bg-gray-100 text-sm text-primary block focus:border-dim-gray border border-dim-gray" htmlFor={name}>
      <p>Upload a file</p>
      <input
        type="file"
        {...register(name)}
        {...props}
        className={cn(`hidden`, className)}
      />
    </label>
  );
};

export default FileInput;
