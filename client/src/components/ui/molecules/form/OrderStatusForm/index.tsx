import Button from "@/components/ui/atoms/buttons/Button";
import Subtitle from "@/components/ui/atoms/typography/Subtitle";
import { apiRequest } from "@/utils/api";
import { notifyError, notifySuccess } from "@/utils/toast";
import React, { useState } from "react";

interface Props {
  orderStatus: string;
  id: string
}

const OrderStatusForm = ({ id, orderStatus }: Props) => {
  const [status, setStatus] = useState(orderStatus);

  const handleUpdateOrderStatus = async () => {
    const result = await apiRequest({
      endpoint: `order/update-status/${id}`,
      body: { status },
      method: "PUT",
    });

    if (!result?.success) {
      notifyError(result?.message);
      return;
    }

    notifySuccess(result?.message);
  };

  return (
    <div>
      <Subtitle className="!font-[500]">Order Status:</Subtitle>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        name="order_status"
        id="order_status"
        className="block mt-1 h-[44px] bg-white text-charcoal lg:h-[45px] px-2 py-2 border border-gray-border rounded-md focus:border-blue-500 focus:outline-0"
      >
        <option value="Processing">Processing</option>
        <option value="Shipped">Shipped</option>
        <option value="Delivered">Delivered</option>
      </select>

      <Button onClick={handleUpdateOrderStatus} className="mt-3 max-w-[200px]">
        Update
      </Button>
    </div>
  );
};

export default OrderStatusForm;
