"use client";

import { ActionProps } from "@/components/Tables";
import TD from "@/components/Tables/TableLayout/TD";
import Button from "@/components/ui/atoms/buttons/Button";
import { useShopRequestStore } from "@/stores/shop-request-store";
import { IShopRequest } from "@/types/extra";
import { apiRequest } from "@/utils/api";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { BsCheck2Circle, BsEye } from "react-icons/bs";
import { CgClose  } from "react-icons/cg";

const ShopRequestsActions = ({ id, record }: ActionProps) => {
  const { handleViewRequest } = useShopRequestStore();
  const router = useRouter();

  const handleView = () => {
    handleViewRequest(record as unknown as IShopRequest);
  };

  const handleApproveShopRequest = async () => {
    const result = await apiRequest({
      endpoint: `shop/approve-request/${id}`,
      body: { status: "approve" },
      method: "PUT",
    });

    if (!result?.success) {
      notifyError(result?.message);
      return;
    }

    notifySuccess(result?.message);
    router.refresh();
  };

  const handleRejectShopRequest = async () => {
    const result = await apiRequest({
      endpoint: `shop/reject-request/${id}`,
      body: { status: "reject" },
      method: "PUT",
    });

    if (!result?.success) {
      notifyError(result?.message);
      return;
    }

    notifySuccess(result?.message);
    router.refresh();
  };

  return (
    <TD className=" flex gap-x-3 items-center  justify-end h-[70px] ">
      <Button onClick={handleView} className="max-w-fit">
        <BsEye size={20} className="text-white" />
      </Button>
      <Button
        onClick={handleApproveShopRequest}
        className="max-w-fit bg-green-500"
      >
        <BsCheck2Circle size={20} className="text-white" />
      </Button>
      <Button
        onClick={handleRejectShopRequest}
        className="max-w-fit bg-tomato-red"
      >
        <CgClose size={20} className="text-white" />
      </Button>
    </TD>
  );
};

export default ShopRequestsActions;
