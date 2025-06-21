import Subtitle3 from "@/components/ui/atoms/typography/Subtitle3";
import { CgArrowRight, CgChevronLeft, CgChevronRight } from "react-icons/cg";
import { Link } from "react-router";

interface TableProps {
  fields: { title: string }[];
  data: { [key: string]: any }[];
}

const Table = ({ fields, data }: TableProps) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-charcoal-gray  overflow-x-auto">
        <thead className="text-xs text-charcoal-gray uppercase bg-gray-100">
          <tr>
            {fields?.length > 0 &&
              fields.map((field, i) => (
                <th key={i} scope="col" className="px-6 py-3 ">
                  {field.title}
                </th>
              ))}
            <th scope="col" className="px-6 py-3 "></th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 &&
            data.map((item, idx) => (
              <tr
                key={idx}
                className={`border-b border-gray-200 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                {Object.keys(item).map((key) => (
                  <td
                    key={key}
                    className="px-6 py-4 font-medium text-primary whitespace-nowrap truncate"
                  >
                    {item[key]}
                  </td>
                ))}
                <td className="px-6 py-4">
                  <Link
                    to="#"
                    className="text-charcoal-gray hover:text-azure-blue hover:underline"
                  >
                    <CgArrowRight size={28} />
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="py-3 px-5 flex items-center justify-end gap-x-5">
        <Subtitle3 className="text-end">1-1 of 12</Subtitle3>
        <div className="flex items-center">
          <button>
            <CgChevronLeft color="#231f20" size={18} />
          </button>
          <button>
            <CgChevronRight color="#231f20" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
