import type { ITableData } from "@/types/common";
import type React from "react";

interface TableBodyProps extends ITableData {
  fields: { [key: string]: string };
  elements: { [key: string]: React.ComponentType<any> };
  actions?: React.ComponentType<{ id: string }>;
}

const TableBody = ({
  data,
  fields,
  elements,
  actions: Actions,
}: TableBodyProps) => {
  return (
    <tbody>
      {data &&
        data.length > 0 &&
        data.map((item: Record<string, any>, i) => (
          <tr
            className="px-5 h-[70px] hover:bg-blue-50/70 even:bg-blue-50/50"
            key={i}
          >
            {Object.keys(fields).map((key: string) => {
              const TD = elements[key];
              return <TD key={key} value={item[key]} index={i} />;
            })}
            {Actions && <Actions id={item["_id"]} />}
          </tr>
        ))}
    </tbody>
  );
};

export default TableBody;
