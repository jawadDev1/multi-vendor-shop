import React from "react";
import Label from "../../../atoms/form/Label";
import Input from "../../../atoms/form/Input";
import type {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type InputWithLabelProps<TFieldValues extends FieldValues> = {
  className?: string;
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  required?: boolean;
  error: FieldError | undefined;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputWithLabel = <TFieldValues extends FieldValues>({
  className,
  label,
  required = false,
  name,
  register,
  error,
  ...props
}: InputWithLabelProps<TFieldValues>) => {
  return (
    <>
      <Label label={label} name={name as string} required={required} />
      <Input {...{ className, register, name, ...props }} />
      {error && (
        <p className="text-tomato-red text-sm mt-1" role="alert">
          {error.message}
        </p>
      )}
    </>
  );
};

export default InputWithLabel;
