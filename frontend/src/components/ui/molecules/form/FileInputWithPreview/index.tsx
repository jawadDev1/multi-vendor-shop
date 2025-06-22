import React, { useState } from "react";
import type {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import FileInput from "@/components/ui/atoms/form/FileInput/Index";
import previewAavatar from "@/assets/avatar-preview.png";

type InputWithLabelProps<TFieldValues extends FieldValues> = {
  className?: string;
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
  required?: boolean;
  error: FieldError | undefined;
  setValue: UseFormSetValue<TFieldValues>;
  defaultPreview?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const FileInputWithPreview = <TFieldValues extends FieldValues>({
  className,
  required = false,
  name,
  register,
  setValue,
  error,
  defaultPreview,
  ...props
}: InputWithLabelProps<TFieldValues>) => {
  const [preview, setPreview] = useState<string | undefined>(
    defaultPreview ?? previewAavatar
  );

  const handleAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files && e.target.files[0];
    if (!file) return;

    setValue(name, file as TFieldValues[typeof name]);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <>
      <span>
        <img
          src={preview}
          alt="react"
          className="size-9 rounded-full object-cover"
        />
      </span>
      <FileInput
        {...{ className, register, name, onChange: handleAvatar, ...props }}
      />
      {error && (
        <p className="text-tomato-red text-sm mt-1" role="alert">
          {error.message}
        </p>
      )}
    </>
  );
};

export default FileInputWithPreview;
