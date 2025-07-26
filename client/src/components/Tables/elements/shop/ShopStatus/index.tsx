"use client";

import TD from "@/components/Tables/TableLayout/TD";

const TableShopStatus = ({ value }: { value: string }) => {
  const status = {
    REQUESTED: "Pending",
    REJECTED: "Rejected",
  };

  return <TD className="">{status[value] ?? "Pending"}</TD>;
};

export default TableShopStatus;
