import TD from "../../../TableLayout/TD";

interface SrProps {
  index: number;
}

const TableSr = ({ index }: SrProps) => {
  return <TD>{index + 1}</TD>;
};

export default TableSr;
