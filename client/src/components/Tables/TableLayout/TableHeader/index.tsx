interface TableHeaderProps {
  fields: { [key: string]: string };
  actions?: React.ComponentType<{ id: string }>;
}

const TableHeader = ({ fields, actions }: TableHeaderProps) => {
  return (
    <thead className="text-justify bg-blue-gray/10">
      {fields && (
        <tr>
          {Object.values(fields).map((field, i) => (
            <th key={i} className="px-3 py-3">
              {field}
            </th>
          ))}
          {actions && <th className="px-3 py-3 text-end">Actions</th>}
        </tr>
      )}
    </thead>
  );
};

export default TableHeader;
