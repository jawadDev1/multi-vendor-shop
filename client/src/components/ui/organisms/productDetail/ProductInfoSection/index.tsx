'use client'
import SectionWrapper from "@/components/ui/atoms/SectionWrapper";
import CardTitle from "@/components/ui/atoms/typography/CardTitle";
import Subtitle2 from "@/components/ui/atoms/typography/Subtitle2";
import ProductReviewTab from "@/components/ui/molecules/productDetail/ProductReviewTab";
import SellerInfoTab from "@/components/ui/molecules/productDetail/SellerInfoTab";
import type { IAPIUserShop, IReview } from "@/types/api";

import cn from "@/utils/cn";
import React, { useState } from "react";

enum ALLOWED_TABS {
  reviews = "reviews",
  info = "info",
}

type TabComponentPropsMap = {
  [ALLOWED_TABS.reviews]: { reviews: IReview[] };
  [ALLOWED_TABS.info]: { shop: IAPIUserShop | null };
};

type Tabs = {
  [K in keyof TabComponentPropsMap]: {
    Tab: React.ComponentType<TabComponentPropsMap[K]>;
    props: TabComponentPropsMap[K];
  };
};

const getActiveTab = <T extends ALLOWED_TABS>(
  tab: T,
  data: {
    description?: string;
    shop?: IAPIUserShop;
    reviews: IReview[];
  }
): {
  Tab: React.ComponentType<TabComponentPropsMap[T]>;
  props: TabComponentPropsMap[T];
} => {
  const tabs: Tabs = {
   
    [ALLOWED_TABS.reviews]: {
      Tab: ProductReviewTab,
      props: { reviews: data.reviews },
    },
    [ALLOWED_TABS.info]: {
      Tab: SellerInfoTab,
      props: { shop: data.shop ?? null },
    },
  };

  return tabs[tab] as {
    Tab: React.ComponentType<TabComponentPropsMap[T]>;
    props: TabComponentPropsMap[T];
  };
};

interface ProductInfoSectionProps {
  description: string;
  shop: IAPIUserShop;
  reviews: IReview[];
}

const ProductInfoSection = ({
  description,
  shop,
  reviews,
}: ProductInfoSectionProps) => {
  const [activeTab, setActiveTab] = useState<ALLOWED_TABS>(
    ALLOWED_TABS.reviews
  );

  const { Tab, props } = getActiveTab(activeTab, {
    description,
    shop,
    reviews,
  });

  return (
    <SectionWrapper className=" rounded px-5">
      <div className="flex w-full overflow-x-auto hide-scrollbar gap-x-4  items-center">
       

        <Subtitle2
          className={cn(
            " shrink-0 cursor-pointer ",
            {
              "text-primary": activeTab === ALLOWED_TABS.reviews,
            }
          )}
          onClick={() => setActiveTab(ALLOWED_TABS.reviews)}
        >
           Reviews
        </Subtitle2>
          <div className="w-px h-7 bg-charcoal-gray/40" />
        <Subtitle2
          className={cn(
            "shrink-0 cursor-pointer ",
            {
              "text-primary": activeTab === ALLOWED_TABS.info,
            }
          )}
          onClick={() => setActiveTab(ALLOWED_TABS.info)}
        >
          Seller Information
        </Subtitle2>
      </div>

      <div className="mt-6 lg:mt-8">
        <Tab {...props} />
      </div>
    </SectionWrapper>
  );
};

export default ProductInfoSection;
