import TD from "@/components/Tables/TableLayout/TD";
import Image from "@/components/ui/atoms/common/Image";

interface Props {
  value: string[];
  index?: number;
}

const TableProductImage = ({ value }: Props) => {
  const image = value[value?.length - 1];
  return (
    <TD className="size-16 rounded overflow-hidden">
      <Image src={image} />
    </TD>
  );
};

export default TableProductImage;
