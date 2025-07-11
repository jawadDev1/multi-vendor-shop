import { BsFillBagCheckFill } from "react-icons/bs";
import PageWrapper from "../../atoms/PageWrapper";
import Subtitle2 from "../../atoms/typography/Subtitle2";
import Subtitle from "../../atoms/typography/Subtitle";
import Content from "../../atoms/typography/Content";
import { formateDateTime } from "@/utils";
import Image from "../../atoms/common/Image";
import Title from "../../atoms/typography/Title";
import Button from "../../atoms/buttons/Button";
import { useState } from "react";
import type { IOrderDetail } from "@/types/api";
import { useAppSelector } from "@/app/hooks";
import { Link } from "react-router";
import { apiRequest } from "@/utils/api";
import { notifyError, notifySuccess } from "@/utils/toast";
import ReviewModal from "../../organisms/Modals/ReviewModal";

interface OrderDetailPageTemplateProps {
  order: IOrderDetail;
  id: string;
}

const OrderDetailPageTemplate = ({
  order,
  id,
}: OrderDetailPageTemplateProps) => {
  if (!order) return;
  const { shop } = useAppSelector((state) => state.shop);
  const isSeller = shop && shop._id === order.shop;

  const { cart, shipping_address, status: orderStatus, totalPrice } = order;

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
    <PageWrapper className="flex flex-col gap-y-7 md:gap-y-8 max-w-[1200px] mx-auto">
      <div className="flex items-center gap-x-4">
        <BsFillBagCheckFill size={30} className="text-azure-blue" />
        <Subtitle className="!font-[500]">Order Details</Subtitle>
      </div>

      <div className="flex justify-between items-center">
        <Content>Order Id: {id}</Content>
        <Content>Placed On: {formateDateTime(order.createdAt)}</Content>
      </div>

      {/* Products */}
      <div>
        {cart &&
          cart.length > 0 &&
          cart.map((item) => (
            <div className="flex items-center justify-between">
              <div className="flex gap-x-2 items-center">
                <div className="size-[60px] md:size-[70px]">
                  <Image src={item?.image ?? ""} />
                </div>
                <div>
                  <Title>{item.title}</Title>
                  <Content className="mt-1">
                    ${item.price} x {item.qty}
                  </Content>
                </div>
              </div>
              {order.status === "Delivered" && !isSeller && (
                <ReviewModal
                  id={item.product}
                  image={item.image}
                  title={item.title}
                />
              )}
            </div>
          ))}
      </div>

      <div>
        <div className="w-full h-px bg-light-gray" />
        <div className="flex items-center justify-end gap-x-1">
          <Subtitle2 className="text-charcoal-gray">Total Price:</Subtitle2>
          <Title>${totalPrice}</Title>
        </div>
      </div>

      <div>
        <Subtitle className="!font-[500]">Shipping Address:</Subtitle>
        <div className="mt-2 flex justify-between">
          <div className="space-y-2 ">
            <Subtitle2>
              <span className="text-charcoal-gray mx-1">Address 1:</span>{" "}
              {shipping_address.address1}
            </Subtitle2>
            <Subtitle2>
              <span className="text-charcoal-gray mx-1">Address 2:</span>{" "}
              {shipping_address.address2}
            </Subtitle2>
            <Subtitle2>
              <span className="text-charcoal-gray mx-1">Contact:</span>
              {shipping_address.contact}
            </Subtitle2>
            <Subtitle2>
              <span className="text-charcoal-gray mx-1">Zip Code:</span>
              {shipping_address.zip_code}
            </Subtitle2>
          </div>
          <div>
            <Subtitle2>Payment Info</Subtitle2>
            <Subtitle2>
              <span className="text-charcoal-gray mx-1">Status:</span>
              {order.payment_info.status}
            </Subtitle2>
          </div>
        </div>
      </div>

      {!isSeller && (
        <Link to={"/"}>
          <Button className="max-w-[300px]">Send Message</Button>
        </Link>
      )}

      {isSeller && (
        <div>
          <Subtitle className="!font-[500]">Order Status:</Subtitle>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            name="order_status"
            id="order_status"
            className="block mt-1 h-[44px] bg-white text-primary lg:h-[45px] px-2 py-2 border border-gray-border rounded-md focus:border-blue-500 focus:outline-0"
          >
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>

          <Button
            onClick={handleUpdateOrderStatus}
            className="mt-3 max-w-[200px]"
          >
            Update
          </Button>
        </div>
      )}
    </PageWrapper>
  );
};

export default OrderDetailPageTemplate;
