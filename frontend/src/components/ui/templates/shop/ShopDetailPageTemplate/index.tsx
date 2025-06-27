import PageWrapper from "@/components/ui/atoms/PageWrapper";
import SectionWrapper from "@/components/ui/atoms/SectionWrapper";
import Subtitle2 from "@/components/ui/atoms/typography/Subtitle2";
import ShopAbout from "@/components/ui/molecules/ShopAbout";
import ShopEvents from "@/components/ui/organisms/shopDetail/ShopEvents";
import ShopProductsSection from "@/components/ui/organisms/shopDetail/ShopProducts";
import ShopReviewsSection from "@/components/ui/organisms/shopDetail/ShopReviews";
import cn from "@/utils/cn";
import { useState } from "react";

enum ALLOWED_MENU_ITEMS {
  products = "products",
  events = "events",
  reviews = "reviews",
}

type MENU_ITEMS = {
  [key in ALLOWED_MENU_ITEMS]: {
    Section: React.ComponentType<any>;
    props: { [key: string]: unknown };
  };
};

const getActiveSection = (section: ALLOWED_MENU_ITEMS) => {
  const menu: MENU_ITEMS = {
    products: {
      Section: ShopProductsSection,
      props: {},
    },
    events: {
      Section: ShopEvents,
      props: {},
    },
    reviews: {
      Section: ShopReviewsSection,
      props: {},
    },
  };

  return menu[section];
};

const ShopDetailPageTemplate = () => {
  const [activeSection, setactiveSection] = useState(
    ALLOWED_MENU_ITEMS.products
  );

  const { Section, props } = getActiveSection(activeSection);

  const handleActiveSection = (section: ALLOWED_MENU_ITEMS) => {
    setactiveSection(section);
  };

  return (
    <PageWrapper className="grid grid-cols-[30%,1fr] gap-5">
      <ShopAbout />

      <div className="px-5">
        <div className="flex items-center gap-x-8 mb-5 ">
          <Subtitle2
            className={cn("!font-semibold cursor-pointer", {
              "text-azure-blue": activeSection === ALLOWED_MENU_ITEMS.products,
            })}
            onClick={() => handleActiveSection(ALLOWED_MENU_ITEMS.products)}
          >
            Shop Products
          </Subtitle2>
          <Subtitle2
            className={cn("!font-semibold cursor-pointer", {
              "text-azure-blue": activeSection === ALLOWED_MENU_ITEMS.events,
            })}
            onClick={() => handleActiveSection(ALLOWED_MENU_ITEMS.events)}
          >
            Running Events
          </Subtitle2>
          <Subtitle2
            className={cn("!font-semibold cursor-pointer", {
              "text-azure-blue": activeSection === ALLOWED_MENU_ITEMS.reviews,
            })}
            onClick={() => handleActiveSection(ALLOWED_MENU_ITEMS.reviews)}
          >
            Shop Reviews
          </Subtitle2>
        </div>

        <SectionWrapper>
          <Section />
        </SectionWrapper>
      </div>
    </PageWrapper>
  );
};

export default ShopDetailPageTemplate;
