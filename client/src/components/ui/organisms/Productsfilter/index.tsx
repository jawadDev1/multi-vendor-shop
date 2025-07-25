"use client";
import { ProductSearchParams } from "@/app/(user)/products/page";
import React, { useState } from "react";
import Subtitle from "../../atoms/typography/Subtitle";
import Subtitle2 from "../../atoms/typography/Subtitle2";
import Title from "../../atoms/typography/Title";
import cn from "@/utils/cn";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { useUpdateSearchParams } from "@/hooks/useUpdateParams";
import PriceFilter from "../../atoms/extra/PriceFilter";
import { isPriceFilterActive } from "@/utils";

interface ProductsFilerProps {
  params: ProductSearchParams;
  categories: { label: string; value: string }[];
}

const PRICE_FILTERS = [
  {
    title: "$0-$200",
    value: {
      min_price: 0,
      max_price: 200,
    },
  },
  {
    title: "$201-$500",
    value: {
      min_price: 201,
      max_price: 500,
    },
  },
  {
    title: "$501-$1000",
    value: {
      min_price: 501,
      max_price: 1000,
    },
  },
  {
    title: "$1001-$5000",
    value: {
      min_price: 1001,
      max_price: 5000,
    },
  },
];

const ProductsFilter = ({ params, categories }: ProductsFilerProps) => {
  const { category, min_price, max_price , search} = params;
  const { clearParams, updateParams } = useUpdateSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleCategoryFilter = (category: string) => {
    updateParams({ key: "category", value: category });
  };

  const handlePriceFilter = (filter: {
    min_price: number;
    max_price: number;
  }) => {
    updateParams([
      { key: "min_price", value: String(filter.min_price) },
      { key: "max_price", value: String(filter.max_price) },
    ]);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (category) count++;
    if (min_price || max_price) count++;
    if(search) count++;
    return count;
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const FilterContent = () => (
    <>
      {categories && categories.length > 0 && (
        <div className="mt-5">
          <Title className="mb-5">Categories</Title>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <Subtitle2
                key={cat?.value}
                onClick={() => handleCategoryFilter(cat.value)}
                className={cn(
                  "px-3 py-2 bg-primary/10 cursor-pointer hover:text-white hover:bg-primary rounded-md transition-all duration-200",
                  {
                    "bg-primary text-white": cat.value == category,
                  }
                )}
              >
                {cat.label}
              </Subtitle2>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5">
        <Title className="mb-5">Price</Title>
        <div className="flex flex-col gap-3">
          {PRICE_FILTERS.map((pr) => (
            <PriceFilter
              key={pr.title}
              handlePriceChange={handlePriceFilter}
              isActive={isPriceFilterActive(pr.value, {
                min_price: min_price ?? "",
                max_price: max_price ?? "",
              })}
              title={pr.title}
              value={pr.value}
            />
          ))}
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden w-full mb-4">
        <button
          onClick={toggleFilter}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center gap-3">
            <HiAdjustmentsHorizontal size={20} className="text-primary" />
            <Subtitle className="text-charcoal">Filters</Subtitle>
            {getActiveFiltersCount() > 0 && (
              <span className="bg-primary text-white text-sm px-2 py-1 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                {getActiveFiltersCount()}
              </span>
            )}
          </div>
          <HiAdjustmentsHorizontal
            size={16}
            className={cn(
              "text-gray-400 transition-transform duration-200",
              isFilterOpen && "rotate-180"
            )}
          />
        </button>

        {/* Mobile Filter Dropdown */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end md:items-center justify-center">
            <div className="bg-white w-full max-h-[80vh] rounded-t-2xl md:rounded-2xl md:max-w-md md:max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center gap-3">
                  <HiAdjustmentsHorizontal size={20} className="text-primary" />
                  <Subtitle>Filters</Subtitle>
                </div>
                <div className="flex items-center gap-3">
                  <Subtitle2
                    onClick={clearParams}
                    className="cursor-pointer hover:text-primary transition-colors duration-200"
                  >
                    Clear All
                  </Subtitle2>
                  <button
                    onClick={toggleFilter}
                    className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
                  >
                    <IoClose size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 overflow-y-auto max-h-[calc(80vh-80px)]">
                <FilterContent />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Filter Sidebar */}
      <aside className="hidden md:block px-3 py-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-2">
            <HiAdjustmentsHorizontal size={24} className="text-primary" />
            <Subtitle>Filter</Subtitle>
          </div>
          <Subtitle2
            onClick={clearParams}
            className="cursor-pointer hover:text-primary transition-colors duration-200"
          >
            Clear All
          </Subtitle2>
        </div>
        <FilterContent />
      </aside>
    </>
  );
};

export default ProductsFilter;
