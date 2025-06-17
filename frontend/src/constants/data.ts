import Cart from "@/components/icons/Cart";
import RepeatArrow from "@/components/icons/RepeatArrow";
import SecurePaymentIcon from "@/components/icons/SecurePayment";
import Trophy from "@/components/icons/Trophy";


interface NavItems {
  title: string;
  link: string;
}

export const NAV_ITEMS: NavItems[] = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Best Selling",
    link: "/best-selling",
  },
  {
    title: "Products",
    link: "/products",
  },
  {
    title: "Events",
    link: "/events",
  },
  {
    title: "FAQ",
    link: "/faqs",
  },
];


export const FEATURES = [
  {
    title: "Free Shipping",
    subtitle: "From all orders over 100$",
    icon: Cart,
  },
  {
    title: "Daily Surprise Offers",
    subtitle: "Save upto 25% off",
    icon: RepeatArrow,
  },
  {
    title: "Affordable Prices",
    subtitle: "Get factory direct price",
    icon: Trophy,
  },
  {
    title: "Secure Payments",
    subtitle: "100% protected payments",
    icon: SecurePaymentIcon,
  },

]