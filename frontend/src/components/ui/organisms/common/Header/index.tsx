import Image from "@/components/ui/atoms/common/Image";
import React, { useState } from "react";
import logo from "@/assets/logo.png";
import { AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";

import { IoIosArrowForward } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import Button from "@/components/ui/atoms/buttons/Button";
import { CATEGORIES, PRODUCTS_DATA, type Product } from "@/constants/static";
import Subtitle2 from "@/components/ui/atoms/typography/Subtitle2";
import { AiOutlineShoppingCart } from "react-icons/ai";
import DropDownMenu from "@/components/ui/molecules/DropDownMenu";
import { Link } from "react-router";

import NavMenu from "@/components/ui/molecules/NavMenu";
import CountIconWrapper from "@/components/ui/atoms/extra/CountIconWrapper";

const Header = () => {
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
    <header className=" hidden md:block">
      <div className="bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex justify-between items-center py-2 px-5 lg:px-2  ">
            <div className="w-[9rem] h-[4rem] overflow-hidden">
              <Image src={logo} />
            </div>
            <div className="relative lg:max-w-[700px] w-full">
              <div className=" grid w-full overflow-hidden rounded-md  grid-cols-[95%,5%] max-h-[50px] border border-light-gray focus:border-azure-blue bg-white items-center">
                <input
                  onChange={handleSearchTerm}
                  type="text"
                  value={searchTerm}
                  placeholder="Search"
                  className="w-full py-3 px-2 border-none focus:border-none focus:outline-none"
                />
                <span className="">
                  <AiOutlineSearch size={24} color="#231f20" />
                </span>
              </div>
              {searchData && searchData.length > 0 && (
                <div className="absolute bg-blue-50 top-full max-h-[400px] overflow-y-auto space-y-3 left-0 w-full py-3 px-2">
                  {searchData.map((data) => (
                    <div key={data.id} className="flex items-center gap-x-2">
                      <div className="size-8">
                        <Image src={data.image} />
                      </div>
                      <Subtitle2>{data.title}</Subtitle2>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <Button className="flex items-center">
                Become Seller <IoIosArrowForward size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Second Nav  */}
      <div className="bg-azure-blue">
        <div className="h-[60px] px-5 max-w-[1200px] mx-auto  flex justify-between items-center">
          <DropDownMenu categories={CATEGORIES} />

          <NavMenu />

          <div className="flex items-center gap-x-4">
            <CountIconWrapper count={0}>
              <AiOutlineHeart size={28} color="white" />
            </CountIconWrapper>

            <CountIconWrapper count={0}>
              <AiOutlineShoppingCart size={28} color="white" />
            </CountIconWrapper>

            <Link to={"/login"}>
              <CgProfile size={28} color="white" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
