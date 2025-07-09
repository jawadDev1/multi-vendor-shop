import Label from "@/components/ui/atoms/form/Label";
import { useState } from "react";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import SpinnerButton from "@/components/ui/atoms/buttons/SpinnerButton";

const INPUT_STYLE =
  "w-full mt-1 h-[44px] placeholder:text-light-gray text-charcoal-gray lg:h-[45px] px-2 py-2 border border-gray-border rounded-md focus:border-blue-500 focus:outline-0";

const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "19px",
      lineHeight: "1.5",
      color: "#4f4f4f",
    },
    empty: {
      color: "#3a120a",
      backgroundColor: "transparent",
      "::placeholder": {
        color: "#c4c4c4",
      },
    },
  },
};

interface PaymentFormProps {
  handlePayment: () => void;
  handleCashOnDelivery: () => void;
  loading: boolean;
}

const PaymentForm = ({
  handlePayment,
  loading,
  handleCashOnDelivery,
}: PaymentFormProps) => {
  const [activeMenthod, setActiveMenthod] = useState<number>(1);

  const [name, setName] = useState<string>("");

  return (
    <div className="bg-white shadow-md rounded-xl px-4 py-5">
      <div>
        <label
          className={"flex items-center gap-x-2  font-medium cursor-pointer"}
          onClick={() => setActiveMenthod(1)}
        >
          <input
            type="radio"
            className="hidden peer"
            name={"method"}
            checked={activeMenthod == 1}
          />
          <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-full border border-[#CBD0DD] peer-checked:border-4 peer-checked:bg-azure-blue peer-checked:border-azure-blue flex items-center justify-center">
            <div className="size-1 bg-white rounded-full"></div>
          </div>
          <span className="lg:text-lg text-primary/70 font-[500]">
            Pay with Debit/Credit card
          </span>
        </label>
      </div>

      {/* Credit Card Payment */}
      {activeMenthod == 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3 ">
          <div>
            <Label label="Name On Card" name="name" required />
            <input
              id="name"
              type="text"
              required
              placeholder="Uzumaki naruto"
              className={INPUT_STYLE}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <Label label="Exp Date" name="exp_date" required />
            <CardExpiryElement
              className={INPUT_STYLE}
              options={ELEMENT_OPTIONS}
            />
          </div>
          <div>
            <Label label="Card Number" name="card_number" required />
            <CardNumberElement
              className={INPUT_STYLE}
              options={ELEMENT_OPTIONS}
            />
          </div>

          <div>
            <Label label="CVC Number" name="cvc_number" required />
            <CardCvcElement className={INPUT_STYLE} options={ELEMENT_OPTIONS} />
          </div>

          <div>
            <SpinnerButton
              isLoading={loading}
              onClick={handlePayment}
              className="max-w-[200px]"
            >
              Pay
            </SpinnerButton>
          </div>
        </div>
      )}

      {/* Cash on Delivery Method */}

      <div className="mt-5 lg:mt-7">
        <label
          className={"flex items-center gap-x-2  font-medium cursor-pointer"}
          onClick={() => setActiveMenthod(2)}
        >
          <input
            type="radio"
            className="hidden peer"
            name={"method"}
            checked={activeMenthod == 2}
          />
          <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-full border border-[#CBD0DD] peer-checked:border-4 peer-checked:bg-azure-blue peer-checked:border-azure-blue flex items-center justify-center">
            <div className="size-1 bg-white rounded-full"></div>
          </div>
          <span className="lg:text-lg text-primary/70 font-[500]">
            Cash on deleivery
          </span>
        </label>
      </div>

      {activeMenthod === 2 && (
        <div className="mt-5">
          <SpinnerButton
            isLoading={loading}
            onClick={handleCashOnDelivery}
            className="max-w-[200px]"
          >
            Confirm
          </SpinnerButton>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
