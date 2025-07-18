import cn from "@/utils/cn";
import Link from "next/link";
import { BiEdit } from "react-icons/bi";

type Props = {
  className?: string;
  link: string;
};

const EditButton = ({ className, link }: Props) => {
  return (
    <Link href={link} className={cn("bg-green-500 p-1 rounded-md", className)}>
      <BiEdit size={20} color="white" />
    </Link>
  );
};

export default EditButton;
