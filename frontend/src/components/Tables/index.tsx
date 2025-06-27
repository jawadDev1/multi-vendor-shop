import TableHeader from "./TableLayout/TableHeader";
import TableBody from "./TableLayout/TableBody";
import type { ITableData } from "@/types/common";

interface TableShellProps extends ITableData {
  fields: { [key: string]: string };

  elements: { [key: string]: React.ComponentType<any> };
  actions?: React.ComponentType<{ id: string }>;
}

const TableShell = ({ fields, data, elements, actions }: TableShellProps) => {
  return (
    <table className="max-w-[1200px] overflow-x-auto mx-auto bg-white shadow w-full text-start px-5 py-3">
      <TableHeader fields={fields} actions={actions} />
      <TableBody
        data={data}
        fields={fields}
        elements={elements}
        actions={actions}
      />
    </table>
  );
};

export default TableShell;
