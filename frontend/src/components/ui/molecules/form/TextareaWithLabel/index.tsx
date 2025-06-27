import React from "react";
import Label from "../../../atoms/form/Label";
import type {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import Textarea from "@/components/ui/atoms/form/Textarea";

type InputWithLabelProps<TFieldValues extends FieldValues> = {
  className?: string;
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  required?: boolean;
  error: FieldError | undefined;
} & React.InputHTMLAttributes<HTMLTextAreaElement>;

const TextareaWithLabel = <TFieldValues extends FieldValues>({
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
      <Textarea {...{ className, register, name, ...props }} />
      {error && (
        <p className="text-tomato-red text-sm mt-1" role="alert">
          {error.message}
        </p>
      )}
    </>
  );
};

export default TextareaWithLabel;
