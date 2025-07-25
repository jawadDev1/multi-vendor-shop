import React, { useState } from "react";
import type {
  FieldValues,
  Path,
} from "react-hook-form";
import FileInput from "@/components/ui/atoms/form/FileInput/Index";
import { BsImage } from "react-icons/bs";

type InputWithLabelProps<TFieldValues extends FieldValues> = {
  className?: string;
  name: Path<TFieldValues>;
  defaultPreview?: string;
  error: string;
  handleImageChange: (file: File) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

// const previewAavatar = "/images/preview.jpeg";

const ImageInputWithPreview = <TFieldValues extends FieldValues>({
  className,
  name,
  defaultPreview,
  error,
  handleImageChange,
  ...props
}: InputWithLabelProps<TFieldValues>) => {
  const [preview, setPreview] = useState<string | undefined>(defaultPreview );

  const handleAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files && e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    handleImageChange(file);
  };

  return (
    <>
      <span>
        {preview ? (
          <img
            src={preview}
            alt="react"
            className="size-16 rounded-full object-cover"
          />

        ): 
          <BsImage size={26} className="text-charcoal inline" />
        }
      </span>
      <FileInput {...{ className, name, onChange: handleAvatar, ...props }} />
      {error && (
        <p className="text-tomato-red text-sm mt-1" role="alert">
          {error}
        </p>
      )}
    </>
  );
};

export default ImageInputWithPreview;
