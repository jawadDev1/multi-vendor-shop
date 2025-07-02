import TD from "../../../TableLayout/TD";
import { formateDateTime } from "@/utils/index";

interface SrProps {
  index: number;
  value: string;
}

const TableDate = ({ value }: SrProps) => {
  return <TD>{formateDateTime(value)}</TD>;
};

export default TableDate;
