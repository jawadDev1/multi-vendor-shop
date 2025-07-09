import { STRIPE_SECRET } from "@/constants";
import CheckoutPageTemplate from "../../templates/CheckoutPageTemplate";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const CheckoutPage = () => {
  return (
    <>
      <Elements stripe={loadStripe(STRIPE_SECRET!)}>
        <CheckoutPageTemplate />
      </Elements>
    </>
  );
};

export default CheckoutPage;
