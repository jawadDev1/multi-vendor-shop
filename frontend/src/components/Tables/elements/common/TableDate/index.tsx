import TD from "../../../TableLayout/TD";
import { formateDate } from "@/utils/index";

interface SrProps {
  index: number;
  value: string;
}

const TableDate = ({ value }: SrProps) => {
  return <TD>{formateDate(value)}</TD>;
};

export default TableDate;
