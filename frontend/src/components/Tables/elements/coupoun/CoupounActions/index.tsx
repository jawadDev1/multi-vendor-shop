import type { ActionProps } from "@/components/Tables";
import TD from "@/components/Tables/TableLayout/TD";
import DeleteButton from "@/components/ui/atoms/buttons/DeleteButton";
import EditButton from "@/components/ui/atoms/buttons/EditButton";
import { deleteApiRequest } from "@/utils/api";

import { notifyError, notifySuccess } from "@/utils/toast";

const TableCoupounActions = ({ id }: ActionProps) => {
  const handleDelete = async () => {
    const result = await deleteApiRequest(`coupoun/coupoun/${id}`);

    if (!result?.success) {
      notifyError(result?.message);
      return;
    }

    notifySuccess(result?.message);
    window.location.reload();
  };

  return (
    <>
      <TD className=" flex gap-x-3 items-center  justify-end h-[70px] ">
        <EditButton link={`/seller/coupoun/update/${id}`} />

        <DeleteButton onClick={handleDelete} />
      </TD>
    </>
  );
};

export default TableCoupounActions;
