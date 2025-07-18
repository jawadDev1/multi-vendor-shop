import AddressIcon from "@/components/icons/AddressIcon";
import RefundIcon from "@/components/icons/RefuncIcon";
import { CgCreditCard, CgShoppingBag, CgTrack } from "react-icons/cg";
import { IoIosChatboxes, IoMdPerson } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund, HiOutlineTag } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";

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
    id: "change_password",
    Icon: RiLockPasswordLine,
    title: "Change Password",
  },
  {
    id: "address",
    Icon: AddressIcon,
    title: "Address",
  },
];

export const SHOP_SIDEBAR_ITEMS = [
  {
    title: "Dashboard",
    slug: "dashboard",
    link: "/seller",
    Icon: RxDashboard,
  },
  {
    title: "All Orders",
    slug: "orders",
    link: "/seller/orders",
    Icon: FiPackage,
  },
  {
    title: "All Products",
    slug: "products",
    link: "/seller/products",
    Icon: FiShoppingBag,
  },
  {
    title: "Create Product",
    slug: "create-product",
    link: "/seller/products/create",
    Icon: AiOutlineFolderAdd,
  },
  {
    title: "All Events",
    slug: "events",
    link: "/seller/events",
    Icon: HiOutlineTag,
  },
  {
    title: "Create Event",
    slug: "create-event",
    link: "/seller/events/create",
    Icon: VscNewFile,
  },
  {
    title: "Withdraw Money",
    slug: "withdraw-money",
    link: "/seller/withdraw-money",
    Icon: CiMoneyBill,
  },
  {
    title: "Shop Inbox",
    slug: "inbox",
    link: "/seller/inbox",
    Icon: BiMessageSquareDetail,
  },
  {
    title: "Discount Codes",
    slug: "coupouns",
    link: "/seller/coupouns",
    Icon: AiOutlineGift,
  },
  {
    title: "Refunds",
    slug: "refunds",
    link: "/seller/refunds",
    Icon: HiOutlineReceiptRefund,
  },
  {
    title: "Settings",
    slug: "settings",
    link: "/seller/settings",
    Icon: CiSettings,
  },
];
