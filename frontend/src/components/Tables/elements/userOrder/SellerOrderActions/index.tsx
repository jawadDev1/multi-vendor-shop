import TD from "@/components/Tables/TableLayout/TD";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router";

interface Props {
  id: string;
}

const SellerOrderActions = ({ id }: Props) => {
  return (
    <TD className=" flex gap-x-3 items-center  justify-end h-[70px] ">
      <Link to={`/seller/order/${id}`}>
        <BsArrowRight size={30} color="#4f4f4f" />
      </Link>
    </TD>
  );
};

export default SellerOrderActions;
