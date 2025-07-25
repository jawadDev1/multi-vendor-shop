"use client";
import { BsFillBagCheckFill } from "react-icons/bs";
import { calculatePriceAfterDiscount, formateDateTime } from "@/utils";
import type { IOrderDetail } from "@/types/api";
import { useShopStore } from "@/stores/shop-store";
import SellerPageWrapper from "@/components/ui/atoms/SellerPageWrapper";
import Subtitle from "@/components/ui/atoms/typography/Subtitle";
import Content from "@/components/ui/atoms/typography/Content";
import NextImage from "@/components/ui/atoms/common/NextImage";
import Title from "@/components/ui/atoms/typography/Title";
import Subtitle2 from "@/components/ui/atoms/typography/Subtitle2";
import { notFound } from "next/navigation";
import OrderStatusForm from "@/components/ui/molecules/form/OrderStatusForm";

interface OrderDetailPageTemplateProps {
  order: IOrderDetail;
  id: string;
}

const SellerOrderDetailPageTemplate = ({
  order,
  id,
}: OrderDetailPageTemplateProps) => {
  const { shop } = useShopStore();
  const isSeller = shop && shop._id === order.shop;

  const { cart, shipping_address, status: orderStatus, totalPrice } = order;

  if (shop && !isSeller) {
    return notFound();
  }

  return (
    <SellerPageWrapper className="flex flex-col gap-y-7 md:gap-y-8 max-w-[1200px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
        <div className="flex  items-center gap-x-4">
          <BsFillBagCheckFill size={30} className="text-primary" />
          <Subtitle className="!font-[500]">Order Details</Subtitle>
        </div>
        <div>
          <Title>
            <span className="text-primary font-medium mx-1">Order Status:</span>
            {orderStatus}
          </Title>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3 justify-between md:items-center">
        <Content>
          {" "}
          <span className="font-medium text-charcoal"> Order Id:</span> {id}
        </Content>
        <Content>
          <span className="font-medium text-charcoal">Placed On: </span>
          {formateDateTime(order.createdAt)}
        </Content>
      </div>

      {/* Products */}
      <div>
        {cart &&
          cart.length > 0 &&
          cart.map((item) => (
            <div key={item.shop} className="flex items-center justify-between">
              <div className="flex gap-x-2 items-center">
                <div className="size-[60px] md:size-[70px]">
                  <NextImage src={item?.image ?? ""} />
                </div>
                <div>
                  <Title>{item.title}</Title>
                  <Content className="mt-1">
                    $
                    {item?.discount
                      ? calculatePriceAfterDiscount(item.price, item.discount)
                      : item.price}
                    x {item.qty}
                  </Content>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div>
        <div className="w-full h-px bg-charcoal-gray/40" />
        <div className="flex items-center justify-end gap-x-1">
          <Subtitle2 className="text-charcoal-gray">Total Price:</Subtitle2>
          <Title>${totalPrice}</Title>
        </div>
      </div>

      <div>
        <Subtitle className="!font-[500]">Shipping Address:</Subtitle>
        <div className="mt-2 flex flex-col md:flex-row gap-5 justify-between">
          <div className="space-y-3 lg:space-y-2 ">
            <Subtitle2>
              <span className="text-charcoal font-medium mx-1">Address 1:</span>{" "}
              {shipping_address.address1}
            </Subtitle2>
            <Subtitle2>
              <span className="text-charcoal font-medium mx-1">Address 2:</span>{" "}
              {shipping_address.address2}
            </Subtitle2>
            <Subtitle2>
              <span className="text-charcoal font-medium mx-1">Contact:</span>
              {shipping_address.contact}
            </Subtitle2>
            <Subtitle2>
              <span className="text-charcoal font-medium mx-1">Zip Code:</span>
              {shipping_address.zip_code}
            </Subtitle2>
          </div>
          <div>
            <Subtitle2 className="!font-semibold">Payment Info</Subtitle2>
            <Subtitle2>
              <span className="text-charcoal font-medium mx-1">Status:</span>
              {order.payment_info.status}
            </Subtitle2>
          </div>
        </div>
      </div>

      <OrderStatusForm id={id} orderStatus={orderStatus} />
    </SellerPageWrapper>
  );
};

export default SellerOrderDetailPageTemplate;
