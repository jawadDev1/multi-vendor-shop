import AddressIcon from "@/components/icons/AddressIcon";
import RefundIcon from "@/components/icons/RefuncIcon";
import { CgCreditCard, CgShoppingBag, CgTrack } from "react-icons/cg";
import { IoIosChatboxes, IoMdPerson } from "react-icons/io";

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

export const COMPANY_LINKS = [
  {
    title: "About Us",
    to: "/about-us",
  },
  {
    title: "Careers",
    to: "/careers",
  },
  {
    title: "Store Locations",
    to: "/store-locations",
  },
  {
    title: "Our Blog",
    to: "/blogs",
  },
  {
    title: "Reviews",
    to: "/reviews",
  },
];

export const SUPPORT_LINKS = [
  {
    title: "FAQs",
    to: "/faqs",
  },
  {
    title: "Contact Us",
    to: "/contact-us",
  },
  {
    title: "Shipping",
    to: "/shipping",
  },

  {
    title: "Reviews",
    to: "/reviews",
  },
];

export const PROFILE_MENU = [
  {
    id: "profile",
    Icon: IoMdPerson,
    title: "Profile",
  },
  {
    id: "orders",
    Icon: CgShoppingBag,
    title: "Orders",
  },
  {
    id: "refunds",
    Icon: RefundIcon,
    title: "Refunds",
  },
  {
    id: "inbox",
    Icon: IoIosChatboxes,
    title: "Inbox",
  },
  {
    id: "track_orders",
    Icon: CgTrack,
    title: "Track Order",
  },
  {
    id: "payment_methods",
    Icon: CgCreditCard,
    title: "Payment Methods",
  },
  {
    id: "address",
    Icon: AddressIcon,
    title: "Address",
  },
];
