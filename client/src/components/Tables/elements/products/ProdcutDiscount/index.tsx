import TD from "@/components/Tables/TableLayout/TD";

interface Props {
  value: number;
}

const TableProductDiscount = ({ value }: Props) => {
  return <TD className={"size-16 rounded overflow-hidden"}>{value}%</TD>;
};

export default TableProductDiscount;
