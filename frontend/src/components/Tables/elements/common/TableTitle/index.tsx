import TD from "../../../TableLayout/TD";

interface TitleProps {
  value: string;
}

const TableTitle = ({ value }: TitleProps) => {
  return (
    <TD className="text-primary text-subtitle2-sm md:text-subtitle2 min-w-[100px] ">
      {value}
    </TD>
  );
};

export default TableTitle;
