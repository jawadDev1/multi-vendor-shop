import React, { useState } from "react";
import type {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import FileInput from "@/components/ui/atoms/form/FileInput/Index";
import Label from "@/components/ui/atoms/form/Label";
import NextImage from "@/components/ui/atoms/common/NextImage";

type InputWithLabelProps<TFieldValues extends FieldValues> = {
  className?: string;
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
  error: FieldError | undefined;
  setValue: UseFormSetValue<TFieldValues>;
  defaultPreview?: string;
  label: string;
  required: boolean
} & React.InputHTMLAttributes<HTMLInputElement>;

const previewAavatar = "/images/avatar-preview.png";

const FileInputWithPreview = <TFieldValues extends FieldValues>({
  className,
  name,
  register,
  setValue,
  error,
  required,
  label,
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
      <Label label={label} name={name} required={required} />
      <div className="flex gap-x-3">
        {" "}
        <span>
          {preview && (
            <NextImage
              src={preview}
              alt="react"
              className="size-10 rounded-full object-cover"
            />
          )}
        </span>
        <FileInput
          {...{ className, register, name, onChange: handleAvatar, ...props }}
        />
        {error && (
          <p className="text-tomato-red text-sm mt-1" role="alert">
            {error.message}
          </p>
        )}
      </div>
    </>
  );
};

export default FileInputWithPreview;
