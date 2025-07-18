import { AiOutlineSearch } from "react-icons/ai";
import Subtitle2 from "@/components/ui/atoms/typography/Subtitle2";
import React, { useState } from "react";
import { PRODUCTS_DATA, type Product } from "@/constants/static";
import Image from "../../atoms/common/NextImage";

const SearchProducts = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchData, setSearchData] = useState<Product[] | null>(null);

  const handleSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target && e.target?.value;

    const data = PRODUCTS_DATA.filter((product) =>
      product.title.includes(term)
    );

    console.log("data", data, term, PRODUCTS_DATA);

    setSearchData(data);

    setSearchTerm(term);
  };

  return (
    <div className="relative  w-full">
      <div className=" grid w-full overflow-hidden rounded-md  grid-cols-[85%,15%] md:grid-cols-[95%,6%] max-h-[50px] border border-light-gray focus:border-azure-blue bg-white items-center">
        <input
          onChange={handleSearchTerm}
          type="text"
          value={searchTerm}
          placeholder="Search"
          className="w-full text-sm lg:text-[16px] py-3 px-2 border-none focus:border-none focus:outline-none"
        />
        <span className="">
          <AiOutlineSearch className="size-[22px] lg:size-6" color="#231f20" />
        </span>
      </div>
      {searchData && searchData.length > 0 && (
        <div className="absolute bg-blue-50 top-full max-h-[400px] overflow-y-auto space-y-3 left-0 w-full py-3 px-2">
          {searchData.map((data) => (
            <div key={data.id} className="flex items-center gap-x-2">
              <div className="size-8">
               <NextImage src={data.image} />
              </div>
              <Subtitle2
              className="truncate"
              >{data.title}</Subtitle2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchProducts;
