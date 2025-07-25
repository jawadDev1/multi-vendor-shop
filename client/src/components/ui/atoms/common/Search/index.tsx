"use client";
import { useUpdateSearchParams } from "@/hooks/useUpdateParams";
import React, { FormEvent, useState } from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const { updateParams } = useUpdateSearchParams();
  const [search, setSearch] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if(!search.trim()) return;

    updateParams({key: "search", value: encodeURIComponent(search.trim())}, "/products");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-[90%,10%] justify-items-center items-center border-blue-gray max-w-[400px] h-11 bg-light-gray rounded-full overflow-hidden px-2 py-1"
    >
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        className="w-full h-full px-1 py-1 text-sm text-charcoal focus:outline-none"
        placeholder="Search"
        required
      />
      <button type="submit" className="">
        <BiSearch className="size-5 md:size-7 text-blue-gray bg-transparent" />
      </button>
    </form>
  );
};

export default Search;
