
import TD from "@/components/Tables/TableLayout/TD";
import NextImage from "@/components/ui/atoms/common/NextImage";


interface Props {
  value: string;
  index?: number;
}

const TableImage = ({ value }: Props) => {

  return (
    <TD className="size-16 rounded overflow-hidden">
    {value && <NextImage src={value} />}
    </TD>
  );
};

export default TableImage;
