import cn from "@/utils/cn";
import React from "react";

interface PriceFilterProps {
  value: { min_price: number; max_price: number };
  title: string;
  handlePriceChange: (filter: { min_price: number; max_price: number }) => void;
  isActive: boolean;
}

const PriceFilter = ({
  value,
  isActive,
  title,
  handlePriceChange,
}: PriceFilterProps) => {
  return (
    <label
      className={"flex items-center gap-x-2  font-medium cursor-pointer"}
      onClick={() => handlePriceChange(value)}
    >
      <input
        onChange={() => {}}
        type="radio"
        className="hidden peer"
        name={"price"}
        checked={isActive}
      />
      <div
        className={cn(
          "w-5 h-5 rounded-full border  border-[#CBD0DD] peer-checked:border-4 peer-checked:!bg-primary peer-checked:!border-primary flex items-center justify-center",
          { "bg-primary !border-primary": isActive }
        )}
      >
        <div className="size-1 bg-white rounded-full"></div>
      </div>
      <span className="lg:text-lg text-charcoal/70 font-[500]">{title}</span>
    </label>
  );
};

export default PriceFilter;
