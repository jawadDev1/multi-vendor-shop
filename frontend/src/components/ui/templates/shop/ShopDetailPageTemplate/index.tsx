import PageWrapper from "@/components/ui/atoms/PageWrapper";
import SectionWrapper from "@/components/ui/atoms/SectionWrapper";
import Subtitle2 from "@/components/ui/atoms/typography/Subtitle2";
import ShopAbout from "@/components/ui/molecules/ShopAbout";
import ShopEvents from "@/components/ui/organisms/shopDetail/ShopEvents";
import ShopProductsSection from "@/components/ui/organisms/shopDetail/ShopProducts";
import ShopReviewsSection from "@/components/ui/organisms/shopDetail/ShopReviews";
import type { IAPIShop, IAPIUserEvent, IAPIUserProduct } from "@/types/api";
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

const getActiveSection = (
  section: ALLOWED_MENU_ITEMS,
  { products, events }: { products: IAPIUserProduct[]; events: IAPIUserEvent[] }
) => {
  const menu: MENU_ITEMS = {
    products: {
      Section: ShopProductsSection,
      props: { products },
    },
    events: {
      Section: ShopEvents,
      props: { events },
    },
    reviews: {
      Section: ShopReviewsSection,
      props: {},
    },
  };

  return menu[section];
};

interface ShopDetailPageTemplateProps {
  shop: IAPIShop;
  events: IAPIUserEvent[];
}

const ShopDetailPageTemplate = ({
  shop,
  events,
}: ShopDetailPageTemplateProps) => {
  const [activeSection, setactiveSection] = useState(
    ALLOWED_MENU_ITEMS.products
  );

  const {
    shop_name,
    logo,
    address,
    contact,
    createdAt,
    owner,
    products,
    slug,
  } = shop;

  const { Section, props } = getActiveSection(activeSection, {
    products: products!,
    events,
  });

  const handleActiveSection = (section: ALLOWED_MENU_ITEMS) => {
    setactiveSection(section);
  };

  return (
    <PageWrapper className="grid grid-cols-1 lg:grid-cols-[30%,1fr] gap-5 ">
      <ShopAbout
        {...{
          shop_name,
          logo,
          address: address!,
          contact,
          createdAt: createdAt!,
          owner: owner!,
        }}
      />

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
          <Section {...props} />
        </SectionWrapper>
      </div>
    </PageWrapper>
  );
};

export default ShopDetailPageTemplate;
