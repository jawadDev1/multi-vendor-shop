
'use client'

import { ActionProps } from "@/components/Tables";
import TD from "@/components/Tables/TableLayout/TD";
import LinkButton from "@/components/ui/atoms/buttons/LinkButton";
import Link from "next/link";
import { BsEye } from "react-icons/bs";



const ShopActions = ({ id, record }: ActionProps) => {

  return (
    <TD className=" flex gap-x-3 items-center  justify-end h-[70px] ">
     <Link className="w-fit bg-primary px-2 py-1 rounded h-fit" href={`/shop/${record?.slug}`}>
        <BsEye size={20} className="text-white" />
     </Link> 
    </TD>
  );
};

export default ShopActions;
