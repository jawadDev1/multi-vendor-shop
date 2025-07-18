'use client';
import { useEffect, useState } from "react";
import Content from "../../atoms/typography/Content";
import Subtitle2 from "../../atoms/typography/Subtitle2";
import Button from "../../atoms/buttons/Button";
import { getApiRequest } from "@/utils/api";
import { notifyError } from "@/utils/toast";
import { calculatePriceAfterDiscount } from "@/utils";
import CardTitle from "../../atoms/typography/CardTitle";
import { useCartStore } from "@/stores/cart-store";

interface CalculateCheckoutPriceProps {
  total: number;
  handleTotal: (val: number) => void;
}

const CalculateCheckoutPrice = ({
  total,
  handleTotal,
}: CalculateCheckoutPriceProps) => {
  const { totalAmount, cart} = useCartStore();
  const [coupounCode, setCoupounCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState<number>(0);

  const shipping = (totalAmount * 0.1).toFixed(2);

  const handleCoupounCode = async () => {
    if (!coupounCode) return;
    let result = await getApiRequest(`coupoun/get-coupoun/${coupounCode}`);

    if (!result.success) {
      notifyError(result.message);
      return;
    }

    result = result.data;

    const products = cart.filter((pro) => pro.shop === result.shop);

    if (products.length === 0) {
      notifyError("coupoun not valid for these shop products");
      return;
    }

    const price: number = products.reduce(
      (acc, curr) =>
        acc + calculatePriceAfterDiscount(curr.price, curr.discount) * curr.qty,
      0
    );
    setDiscount(Number((price * (result.value / 100)).toFixed(2)));
    const discountPrice = calculatePriceAfterDiscount(price, result?.value);
    const restPrice = cart
      .filter((item) => item.shop !== result.shop)
      .reduce((acc, curr) => {
        return (
          acc +
          calculatePriceAfterDiscount(curr.price, curr.discount) * curr.qty
        );
      }, 0);

    setPriceAfterDiscount(discountPrice + restPrice);
  };

  useEffect(() => {
    const totalPrice: number = priceAfterDiscount
      ? priceAfterDiscount + Number(shipping)
      : totalAmount + Number(shipping);

    handleTotal(Number(totalPrice.toFixed(2)));
  }, [priceAfterDiscount, totalAmount]);

  return (
    <div className="w-full bg-white shadow-xl rounded-xl py-5 px-3 h-fit">
      <div className="space-y-5 lg:space-y-7">
        <div className="flex items-center justify-between">
          <Content>subtotal:</Content>
          <Subtitle2>${totalAmount}</Subtitle2>
        </div>
        <div className="flex items-center justify-between">
          <Content>shipping:</Content>
          <Subtitle2>${shipping}</Subtitle2>
        </div>
        <div className="flex items-center justify-between">
          <Content>Discount:</Content>
          <Subtitle2>{discount ? `$${discount}` : "-"}</Subtitle2>
        </div>
      </div>

      <div className="bg-light-gray/40 w-full h-[1px] mt-5 lg:mt-7" />
      <div className="text-end mb-5 lg:mb-7 mt-2">
        <CardTitle>${total.toFixed(2)}</CardTitle>
      </div>

      <Content>Coupoun code</Content>
      <input
        value={coupounCode}
        onChange={(e) => setCoupounCode(e.target.value)}
        className={`w-full mt-1 h-[44px] placeholder:text-light-gray text-primary lg:h-[45px] px-2 py-2 border border-gray-border rounded-md focus:border-blue-500 focus:outline-0`}
        placeholder="Enter coupoun code"
      />
      <Button
        disabled={!coupounCode}
        onClick={handleCoupounCode}
        className="bg-transparent border disabled:cursor-not-allowed border-azure-blue text-azure-blue mt-4 lg:mt-5 hover:bg-azure-blue hover:text-white "
      >
        Apply code
      </Button>
    </div>
  );
};

export default CalculateCheckoutPrice;
