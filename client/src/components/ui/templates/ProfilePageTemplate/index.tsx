'use client';
import { useState } from "react";
import PageWrapper from "../../atoms/PageWrapper";
import Subtitle2 from "../../atoms/typography/Subtitle2";

import { PROFILE_MENU } from "@/constants/data";
import ProfileInfo from "../../organisms/userProfile/ProfileInfo";
import cn from "@/utils/cn";
import OrdersSection from "../../organisms/userProfile/Orders";
import SectionWrapper from "../../atoms/SectionWrapper";

import RefundsSection from "../../organisms/userProfile/Refunds";
import TrackOrderSection from "../../organisms/userProfile/TrackOrder";

import AddressSection from "../../organisms/userProfile/Address";
import ChangePasswordSection from "../../organisms/userProfile/ChangePasswordSection";
import InboxSection from "../../organisms/userProfile/Inbox";
import UserLogout from "../../molecules/UserLogout";

enum ALLOWED_MENU_ITEMS {
  profile = "profile",
  orders = "orders",
  refunds = "refunds",
  track_orders = "track_orders",
  change_password = "change_password",
  address = "address",
  inbox = "inbox",
}

type MENU_ITEMS = {
  [key in ALLOWED_MENU_ITEMS]: {
    Tab: React.ComponentType<any>;
    props: { [key: string]: unknown };
  };
};

const getActiveSection = (section: ALLOWED_MENU_ITEMS) => {
  const menu: MENU_ITEMS = {
    profile: {
      Tab: ProfileInfo,
      props: {},
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
    change_password: {
      Tab: ChangePasswordSection,
      props: {},
    },
    address: {
      Tab: AddressSection,
      props: {},
    },
    inbox: {
      Tab: InboxSection,
      props: {},
    },
  };

  return menu[section];
};

interface ProfilePageTemplateProps {}

const ProfilePageTemplate = ({}: ProfilePageTemplateProps) => {
  const [activeSection, setActiveSection] = useState<ALLOWED_MENU_ITEMS>(
    ALLOWED_MENU_ITEMS.profile
  );

  const handleSection = (section: ALLOWED_MENU_ITEMS) => {
    setActiveSection(section);
  };

  const { Tab, props } = getActiveSection(activeSection);

  return (
    <PageWrapper className="grid grid-cols-1 md:grid-cols-[20%,1fr] px-5 lg:px-0 max-w-[1200px] mx-auto">
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
              className={cn(
                "size-[28px] text-charcoal-gray group-hover:text-azure-blue ",
                {
                  "text-azure-blue": activeSection === id,
                }
              )}
            />
            <Subtitle2
              className={cn(
                "hidden md:block text-charcoal-gray group-hover:text-azure-blue",
                {
                  "text-azure-blue": activeSection === id,
                }
              )}
            >
              {title}
            </Subtitle2>
          </div>
        ))}
        <UserLogout />
      </div>

      <SectionWrapper className="lg:px-10 mt-10 lg:mt-0">
        <Tab {...props} />
      </SectionWrapper>
    </PageWrapper>
  );
};

export default ProfilePageTemplate;
