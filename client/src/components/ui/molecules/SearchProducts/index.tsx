import { AiOutlineSearch } from "react-icons/ai";
import React, { FormEvent, useState } from "react";
import { useUpdateSearchParams } from "@/hooks/useUpdateParams";

const SearchProducts = ({handleNav}: {handleNav: () => void}) => {
  const { updateParams } = useUpdateSearchParams();
  const [search, setSearch] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;

    updateParams(
      { key: "search", value: encodeURIComponent(search.trim()) },
      "/products"
    );

    handleNav();
  };

  return (
    <div className="relative  w-full">
      <form onSubmit={handleSubmit} className=" grid w-full overflow-hidden rounded-md  grid-cols-[85%,15%] md:grid-cols-[95%,6%] max-h-[50px] border border-light-gray focus:border-azure-blue bg-white items-center">
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          value={search}
          placeholder="Search"
          className="w-full text-sm lg:text-[16px] py-3 px-2 border-none focus:border-none focus:outline-none"
        />
        <button type="submit" className="">
          <AiOutlineSearch className="size-[22px] lg:size-6" color="#231f20" />
        </button>
      </form>
    </div>
  );
};

export default SearchProducts;
