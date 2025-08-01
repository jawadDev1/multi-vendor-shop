import TD from "@/components/Tables/TableLayout/TD";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

interface Props {
  id: string;
}

const UserOrderActions = ({ id }: Props) => {
  return (
    <TD className=" flex gap-x-3 items-center  justify-end h-[70px] ">
      <Link href={`/order/${id}`}>
        <BsArrowRight size={30} color="#4f4f4f" />
      </Link>
    </TD>
  );
};

export default UserOrderActions;
