import { useState } from "react";
import PageWrapper from "../../atoms/PageWrapper";
import Subtitle2 from "../../atoms/typography/Subtitle2";

import { PROFILE_MENU } from "@/constants/data";
import ProfileInfo from "../../organisms/userProfile/ProfileInfo";
import cn from "@/utils/cn";
import OrdersSection from "../../organisms/userProfile/Orders";
import SectionWrapper from "../../atoms/SectionWrapper";

import type { IAPIUser } from "@/types/api";
import RefundsSection from "../../organisms/userProfile/Refunds";
import TrackOrderSection from "../../organisms/userProfile/TrackOrder";
import PaymentMethodsSection from "../../organisms/userProfile/PaymentMethodsSection";
import AddressSection from "../../organisms/userProfile/Address";
import { CgLogOut } from "react-icons/cg";
import { getApiRequest } from "@/utils/api";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useNavigate } from "react-router";

enum ALLOWED_MENU_ITEMS {
  profile = "profile",
  orders = "orders",
  refunds = "refunds",
  track_orders = "track_orders",
  payment_methods = "payment_methods",
  address = "address",
}

type MENU_ITEMS = {
  [key in ALLOWED_MENU_ITEMS]: {
    Tab: React.ComponentType<any>;
    props: { [key: string]: unknown };
  };
};

const getActiveSection = (
  section: ALLOWED_MENU_ITEMS,
  user: IAPIUser | null
) => {
  const menu: MENU_ITEMS = {
    profile: {
      Tab: ProfileInfo,
      props: { user },
    },
    orders: {
      Tab: OrdersSection,
      props: {},
    },
    refunds: {
      Tab: RefundsSection,
      props: {},
    },
    track_orders: {
      Tab: TrackOrderSection,
      props: {},
    },
    payment_methods: {
      Tab: PaymentMethodsSection,
      props: {},
    },
    address: {
      Tab: AddressSection,
      props: {},
    },
  };

  return menu[section];
};

interface ProfilePageTemplateProps {
  user: IAPIUser | null;
}

const ProfilePageTemplate = ({ user }: ProfilePageTemplateProps) => {
  const [activeSection, setActiveSection] = useState<ALLOWED_MENU_ITEMS>(
    ALLOWED_MENU_ITEMS.profile
  );
  const navigate = useNavigate();

  const handleSection = (section: ALLOWED_MENU_ITEMS) => {
    setActiveSection(section);
  };

  const { Tab, props } = getActiveSection(activeSection, user);

  const handleLogout = async () => {
    try {
      const result = await getApiRequest("user/logout");

      if (!result?.success) return;

      notifySuccess(result?.message);

      navigate("/");
    } catch (error) {
      notifyError(error as string);
    }
  };

  return (
    <PageWrapper className="grid grid-cols-1 md:grid-cols-[20%,1fr] px-5 lg:px-0">
      <div
        className="bg-white rounded-md w-full py-3 lg:py-4 px-2 lg:px-3 shadow
      flex items-center md:items-start  md:flex-col lg:gap-6 justify-between h-fit mt-5 lg:mt-0
      "
      >
        {PROFILE_MENU.map(({ Icon, id, title }) => (
          <div
            onClick={() => handleSection(id as ALLOWED_MENU_ITEMS)}
            key={id}
            className="flex group items-center gap-x-3 cursor-pointer "
          >
            <Icon
              className={cn("size-[28px] text-charcoal-gray group-hover:text-azure-blue ", {
                "text-azure-blue": activeSection === id,
              })}
            />
            <Subtitle2
              className={cn("hidden md:block text-charcoal-gray group-hover:text-azure-blue", {
                "text-azure-blue": activeSection === id,
              })}
            >
              {title}
            </Subtitle2>
          </div>
        ))}
        <div
          onClick={handleLogout}
          className=" hidden md:flex group items-center gap-x-3 cursor-pointer "
        >
          <CgLogOut
            className={cn("size-[28px] text-charcoal-gray group-hover:text-azure-blue ")}
          />
          <Subtitle2 className={cn("text-charcoal-gray group-hover:text-azure-blue")}>
            Logout
          </Subtitle2>
        </div>
      </div>

      <SectionWrapper className="lg:px-10 mt-10 lg:mt-0">
        <Tab key={user?.name ?? "key"} {...props} />
      </SectionWrapper>
    </PageWrapper>
  );
};

export default ProfilePageTemplate;
