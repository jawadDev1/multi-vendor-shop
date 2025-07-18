import React, { useState } from "react";
import type { FieldValues, Path } from "react-hook-form";
import FileInput from "@/components/ui/atoms/form/FileInput/Index";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Label from "@/components/ui/atoms/form/Label";
import NextImage from "@/components/ui/atoms/common/NextImage";

import { notifyError } from "@/utils/toast";
import { CgClose } from "react-icons/cg";

type Props<TFieldValues extends FieldValues> = {
  className?: string;
  name: Path<TFieldValues>;
  required?: boolean;
  error: undefined | string;
  label: string;
  handleImages: (img: File) => void;
  handleRemoveImages: (index: number, defaultImages?: boolean) => void;
  defaultImages?: string[];
} & React.InputHTMLAttributes<HTMLInputElement>;

const MultiFileInputWithPreview = <TFieldValues extends FieldValues>({
  className,
  required = false,
  name,
  error,
  label,
  defaultImages = [],
  handleImages,
  handleRemoveImages,
  ...props
}: Props<TFieldValues>) => {
  const [previewImages, setPreviewImages] = useState<string[]>(defaultImages);

  const handleAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (previewImages.length >= 3)
      return notifyError("Maximum 3 images are allowed");

    const file = e.target?.files && e.target.files[0];
    if (!file) return;

    setPreviewImages((prev) => [...prev, URL.createObjectURL(file)]);
    handleImages(file);
  };

  const handleRemoveAvatar = (index: number) => {
    let shouldRemoveFromDefault = !previewImages[index].includes("blob");
    let filteredImages = previewImages.filter((_, i) => i !== index);
    setPreviewImages(filteredImages);

    handleRemoveImages(index, shouldRemoveFromDefault);
  };

  return (
    <>
      <Label label={label} name={name} required={required} />
      <div className="flex items-center gap-x-4 max-w-full overflow-x-auto">
        <FileInput {...{ className, name, onChange: handleAvatar, ...props }}>
          <AiOutlinePlusCircle color="#555" size={28} />
        </FileInput>
        {previewImages.length > 0 && (
          <div className="flex items-center flex-nowrap max-w-full overflow-x-auto w-full gap-5 ">
            {previewImages.map((image, i) => (
              <div key={i} className="relative pt-2">
                <div className="size-20">
                 <NextImage src={image} />
                </div>
                <span
                  onClick={() => handleRemoveAvatar(i)}
                  className="absolute -right-2 top-1 bg-white rounded-full p-0.5 text-red-600 cursor-pointer"
                >
                  <CgClose size={16} />
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      {error && (
        <p className="text-tomato-red text-sm mt-1" role="alert">
          {error}
        </p>
      )}
    </>
  );
};

export default MultiFileInputWithPreview;
