
import TD from "@/components/Tables/TableLayout/TD";
import NextImage from "@/components/ui/atoms/common/NextImage";

interface Props {
  value: string;
  index?: number;
}

const TableImage = ({ value }: Props) => {

  return (
    <TD className="size-16  overflow-hidden">
    {value && <NextImage src={value} className="object-cover" />}
    </TD>
  );
};

export default TableImage;
