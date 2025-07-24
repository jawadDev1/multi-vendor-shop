'use client';
import React, { useState } from "react";
import SectionWrapper from "@/components/ui/atoms/SectionWrapper";
import Subtitle2 from "@/components/ui/atoms/typography/Subtitle2";
import ShopEvents from "@/components/ui/organisms/shopDetail/ShopEvents";
import ShopProductsSection from "@/components/ui/organisms/shopDetail/ShopProducts";
import ShopReviewsSection from "@/components/ui/organisms/shopDetail/ShopReviews";

import cn from "@/utils/cn";
import { IAPIProduct, IAPIShopDetails, IAPIUserEvent, IAPIUserProduct } from "@/types/api";

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
  {
    products,
    events,
    slug,
  }: { products: IAPIUserProduct[]; events: IAPIUserEvent[]; slug: string }
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
      props: { slug },
    },
  };

  return menu[section];
};

interface ShopDetailMenuProps {
  products: IAPIUserProduct[];
  events: IAPIUserEvent[];
  slug: string
}

const ShopDetailMenu = ({events, products, slug}: ShopDetailMenuProps) => {
  const [activeSection, setactiveSection] = useState(
    ALLOWED_MENU_ITEMS.products
  );

  const { Section, props } = getActiveSection(activeSection, {
    products: products!,
    events,
    slug,
  });

  const handleActiveSection = (section: ALLOWED_MENU_ITEMS) => {
    setactiveSection(section);
  };

  return (
    <div className="px-5">
      <div className="flex items-center gap-x-8 mb-5 ">
        <Subtitle2
          className={cn("!font-semibold cursor-pointer", {
            "text-primary": activeSection === ALLOWED_MENU_ITEMS.products,
          })}
          onClick={() => handleActiveSection(ALLOWED_MENU_ITEMS.products)}
        >
          Shop Products
        </Subtitle2>
        <Subtitle2
          className={cn("!font-semibold cursor-pointer", {
            "text-primary": activeSection === ALLOWED_MENU_ITEMS.events,
          })}
          onClick={() => handleActiveSection(ALLOWED_MENU_ITEMS.events)}
        >
          Running Events
        </Subtitle2>
        <Subtitle2
          className={cn("!font-semibold cursor-pointer", {
            "text-primary": activeSection === ALLOWED_MENU_ITEMS.reviews,
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
  );
};

export default ShopDetailMenu;
