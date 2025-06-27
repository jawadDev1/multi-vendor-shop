import cn from "@/utils/cn";
import React from "react";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router";

type Props = {
  className?: string;
  link: string;
};

const EditButton = ({ className, link }: Props) => {
  return (
    <Link to={link} className={cn("bg-green-500 p-1 rounded-md", className)}>
      <BiEdit size={20} color="white" />
    </Link>
  );
};

export default EditButton;
