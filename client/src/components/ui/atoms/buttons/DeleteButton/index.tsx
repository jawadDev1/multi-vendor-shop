import cn from "@/utils/cn";
import React from "react";
import { BiTrash } from "react-icons/bi";

type Props = {
  className?: string;
} & React.HTMLAttributes<HTMLButtonElement>;

const DeleteButton = ({ className, ...props }: Props) => {
  return (
    <button
      className={cn("bg-tomato-red p-1 rounded-md", className)}
      {...props}
    >
      <BiTrash size={20} color="white" />
    </button>
  );
};

export default DeleteButton;
