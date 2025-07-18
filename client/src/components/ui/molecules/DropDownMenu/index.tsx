import { useState } from "react";
import Subtitle2 from "../../atoms/typography/Subtitle2";
import { IoIosArrowDown } from "react-icons/io";
import Image from "../../atoms/common/NextImage";
import cn from "@/utils/cn";
import type { IAPIUserCategory } from "@/types/api";

interface DropDownMenuProps {
  categories: IAPIUserCategory[];
}

const DropDownMenu = ({ categories }: DropDownMenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative max-w-56 h-[60px] justify-center w-full  flex flex-col items-end ">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white cursor-pointer flex items-center justify-center gap-x-2 cursor-pointerd shrink-0 w-full rounded-t-md h-[50px] mt-auto  "
      >
        <Subtitle2>All Categories</Subtitle2>
        <IoIosArrowDown size={20} className={cn({ "rotate-180": isOpen })} />
      </div>

      {isOpen && categories && categories.length > 0 && (
        <div className="z-10 absolute py-3 px-2 top-full space-y-4 left-0 w-full bg-blue-50/50 max-h-48 overflow-y-auto">
          {categories.map((category) => (
            <Link
              href={`/products?category=${category?._id}`}
              className="flex items-center gap-x-2 cursor-pointer"
              key={category?._id}
            >
              <div className="size-7">
               <NextImage src={category.image} />
              </div>
              <Subtitle2 className="hover:text-azure-blue">
                {category.title}
              </Subtitle2>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;
