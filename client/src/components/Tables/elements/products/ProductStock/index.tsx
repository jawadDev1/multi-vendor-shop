
import TD from "@/components/Tables/TableLayout/TD";
import cn from "@/utils/cn";


interface Props {
  value: number;
}

const TableProductStock = ({ value }: Props) => {
  return (
    <TD className={cn("size-16 rounded overflow-hidden", {"text-tomato-red": value === 0})}>
    {value}
    </TD>
  );
};

export default TableProductStock;
