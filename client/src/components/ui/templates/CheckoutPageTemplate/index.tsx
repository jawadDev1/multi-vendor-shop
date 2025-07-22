'use client';
import { useState } from "react";
import PageWrapper from "../../atoms/PageWrapper";
import CheckoutSteps from "../../molecules/CheckoutSteps";
import {
  shippingSchema,
  type ShippingFormData,
} from "@/schemas/shipping.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { apiRequest } from "@/utils/api";
import CalculateCheckoutPrice from "../../molecules/CalculateCheckoutPrice";
import ShippingForm from "../../organisms/forms/ShippingForm";
import PaymentForm from "../../organisms/forms/PaymentForm";
import { notifyError } from "@/utils/toast";
import {
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import OrderSuccess from "../../atoms/extra/OrderSuccess";
import { useCartStore } from "@/stores/cart-store";
import { useRouter } from "next/navigation";

const intialState = {
  country: "",
  city: "",
  address1: "",
  address2: "",
  zip_code: 0,
  address_type: "",
  contact: 0,
  name: "",
  email: "",
};

const CheckoutPageTemplate = () => {
  // Redux
const {cart: cartItems, clearCart} = useCartStore();


  // Stripe
  const stripe = useStripe();
  const elements = useElements();
  // States
  const [step, setStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: intialState,
  });

  const formData = watch();

  const onSubmit = async (_: ShippingFormData) => {
    setStep(2);
  };

  const handleTotal = (val: number) => {
    setTotalAmount(val);
  };

  const handleCashOnDelivery = async () => {
    setIsLoading(true);
    const order = {
      cart: cartItems.map(
        ({ image, price, id: product, qty, shop, title, discount }) => ({
          image,
          price,
          product,
          shop,
          qty,
          title,
          discount
        })
      ),
      shipping_address: formData,
      totalPrice: totalAmount,
      payment_info: { type: "CASH_ON_DELIVERY" },
    };

    const orderRes = await apiRequest({
      endpoint: "order/create",
      body: order,
    });
    if (!orderRes?.success) {
      notifyError(orderRes?.message);
      setIsLoading(false);
      return;
    }

    (clearCart());

    setStep(3);
    setTimeout(() => router.push("/"), 2000);
    setIsLoading(false);
  };

  
    // Handle Stripe Payment
  const paymentHandler = async () => {
    setIsLoading(true);
    const amount = Math.round(totalAmount * 100);
    const order = {
      cart: cartItems.map(
        ({ image, price, id: product, qty, shop, title, discount }) => ({
          image,
          price,
          product,
          shop,
          qty,
          title,
          discount
        })
      ),
      shipping_address: formData,
      totalPrice: totalAmount,
      payment_info: {},
    };

    const result = await apiRequest({
      endpoint: "payment/process",
      body: { amount },
    });

    if (!result.success) {
      notifyError(result?.message);
      setIsLoading(false);
      return;
    }
    const client_secret = result?.data?.client_secret;

    if (!stripe || !elements) {
      setIsLoading(false);
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) {
      setIsLoading(false);
      return;
    }

    const res = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: cardNumberElement,
      },
    });

    if (res.error) {
      notifyError(res.error?.message!);
      setIsLoading(false);
    } else {
      if (res.paymentIntent.status === "succeeded") {
        order.payment_info = {
          id: res.paymentIntent.id,
          status: res.paymentIntent.status,
          type: "CREDIT_CARD",
        };
      }

      const orderRes = await apiRequest({
        endpoint: "order/create",
        body: order,
      });
      if (!orderRes?.success) {
        notifyError(orderRes?.message);
        setIsLoading(false);
        return;
      }

      (clearCart());

      setStep(3);
      setTimeout(() => router.push("/"), 2000);
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <CheckoutSteps step={step} />

      <div className="grid grid-cols-[65%,35%] gap-7 justify-between   mt-8 ">
        <div>
          {step == 1 && (
            <ShippingForm
              {...{ errors, formData, handleSubmit, onSubmit, register, reset }}
            />
          )}

          {step == 2 && (
            <PaymentForm
              loading={isLoading}
              handlePayment={paymentHandler}
              handleCashOnDelivery={handleCashOnDelivery}
            />
          )}
        </div>

        {step < 3 && (
          <CalculateCheckoutPrice
            handleTotal={handleTotal}
            total={totalAmount}
          />
        )}
      </div>

      {step === 3 && <OrderSuccess />}
    </PageWrapper>
  );
};

export default CheckoutPageTemplate;
