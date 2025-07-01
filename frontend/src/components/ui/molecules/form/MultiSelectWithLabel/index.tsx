import React, { useState } from "react";
import Label from "../../../atoms/form/Label";
import Input from "../../../atoms/form/Input";
import type {
  FieldError,
  FieldValues,
  Path,
  UseFormSetValue,
} from "react-hook-form";
import type { ISelectOptions } from "@/types/common";
import Subtitle2 from "@/components/ui/atoms/typography/Subtitle2";
import { CgChevronDown, CgClose } from "react-icons/cg";
import Subtitle3 from "@/components/ui/atoms/typography/Subtitle3";

type Props<TFieldValues extends FieldValues> = {
  className?: string;
  setValue: UseFormSetValue<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  required?: boolean;
  error: FieldError | undefined;
  options: ISelectOptions[];
  defaultOptions?: string[];
};

const MultiSelectWithLabel = <TFieldValues extends FieldValues>({
  className,
  label,
  required = false,
  name,
  setValue,
  error,
  options,
  defaultOptions = [],
}: Props<TFieldValues>) => {
  const [selectedOptions, setSelectedOtions] =
    useState<string[]>(defaultOptions);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (option: string, remove: boolean = false) => {
    let newOptions = remove
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];

    setSelectedOtions(newOptions);

    setValue(name, newOptions as TFieldValues[typeof name]);
  };

  return (
    <>
      <Label label={label} name={name as string} required={required} />

      <div className="relative ">
        <div className="flex items-center overflow-x-auto gap-x-3 flex-nowrap">
          {selectedOptions &&
            selectedOptions.length > 0 &&
            options
              .filter((option) => selectedOptions.includes(option.value))
              .map((option) => (
                <span
                  key={option.value}
                  onClick={() => handleSelect(option.value, true)}
                  className="text-sm text-white bg-azure-blue p-1 flex justify-between items-center gap-2 rounded"
                >
                  {option.label}
                  <CgClose className="size-[15px] cursor-pointer hover:text-tomato-red" />
                </span>
              ))}
        </div>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-between w-full mt-1 h-[44px] placeholder:text-light-gray text-primary lg:h-[45px] px-2 py-2 border border-gray-border rounded-md focus:border-blue-500 focus:outline-0 cursor-pointer`}
        >
          <Subtitle2>Select</Subtitle2>
          <CgChevronDown className="size-[18px] " />
        </div>

        {isOpen && selectedOptions.length !== options.length && (
          <div className="absolute bg-white z-10 top-full left-0 w-full  rounded border border-light-gray p-3 space-y-2">
            {options &&
              options.length > 0 &&
              options
                .filter((option) => !selectedOptions.includes(option.value))
                .map((option) => (
                  <Subtitle3
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className="hover:bg-blue-50 p-1 cursor-pointer rounded"
                  >
                    {option.label}
                  </Subtitle3>
                ))}
          </div>
        )}
      </div>

      {error && (
        <p className="text-tomato-red text-sm mt-1" role="alert">
          {error.message}
        </p>
      )}
    </>
  );
};

export default MultiSelectWithLabel;
