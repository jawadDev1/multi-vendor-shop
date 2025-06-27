import TD from "@/components/Tables/TableLayout/TD";
import DeleteButton from "@/components/ui/atoms/buttons/DeleteButton";
import EditButton from "@/components/ui/atoms/buttons/EditButton";
import { deleteApiRequest } from "@/utils/api";
import { notifyError, notifySuccess } from "@/utils/toast";

interface Props {
  id: string;
}

const TableProductActions = ({ id }: Props) => {
  const handleDelete = async () => {
    const result = await deleteApiRequest(`product/product/${id}`);

    if (!result?.success) {
      notifyError(result?.message);
      return;
    }

    notifySuccess(result?.message);
    window.location.reload();
  };

  return (
    <TD className=" flex gap-x-3 items-center  justify-end h-[70px] ">
      <EditButton link={`/seller/update-product/${id}`} />
      <DeleteButton onClick={handleDelete} />
    </TD>
  );
};

export default TableProductActions;
