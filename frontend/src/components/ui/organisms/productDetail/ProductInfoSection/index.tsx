import SectionWrapper from "@/components/ui/atoms/SectionWrapper";
import CardTitle from "@/components/ui/atoms/typography/CardTitle";
import ProductDetailsTab from "@/components/ui/molecules/productDetail/ProductDetailsTab";
import ProductReviewTab from "@/components/ui/molecules/productDetail/ProductReviewTab";
import SellerInfoTab from "@/components/ui/molecules/productDetail/SellerInfoTab";

import cn from "@/utils/cn";
import React, { useState } from "react";

enum ALLOWED_TABS {
  details = "details",
  reviews = "reviews",
  info = "info",
}

interface TabProps {
  [key: string]: string;
}

type Tabs = {
  [key in ALLOWED_TABS]: {
    Tab: React.ComponentType<any>;
    props: TabProps;
  };
};

const tabs: Tabs = {
  [ALLOWED_TABS.details]: {
    Tab: ProductDetailsTab,
    props: {},
  },
  [ALLOWED_TABS.reviews]: {
    Tab: ProductReviewTab,
    props: {},
  },
  [ALLOWED_TABS.info]: {
    Tab: SellerInfoTab,
    props: {},
  },
};

const getActiveTab = (tab: ALLOWED_TABS) => {
  return tabs[tab];
};

const ProductInfoSection = () => {
  const [activeTab, setActiveTab] = useState<ALLOWED_TABS>(
    ALLOWED_TABS.details
  );

  const { Tab, props } = getActiveTab(activeTab);

  return (
    <SectionWrapper className="py-7 lg:py-10 bg-blue-50 rounded shadow px-5">
      <div className="flex w-full overflow-x-auto hide-scrollbar gap-x-7 lg:justify-between items-center">
        <CardTitle
          className={cn(
            "border-b-4 shrink-0 cursor-pointer border-transparent py-2",
            {
              "border-azure-blue": activeTab === ALLOWED_TABS.details,
            }
          )}
          onClick={() => setActiveTab(ALLOWED_TABS.details)}
        >
          Product Details
        </CardTitle>

        <CardTitle
          className={cn(
            "border-b-4 shrink-0 cursor-pointer border-transparent py-2",
            {
              "border-azure-blue": activeTab === ALLOWED_TABS.reviews,
            }
          )}
          onClick={() => setActiveTab(ALLOWED_TABS.reviews)}
        >
          Product Reviews
        </CardTitle>

        <CardTitle
          className={cn(
            "border-b-4 shrink-0 cursor-pointer border-transparent py-2",
            {
              "border-azure-blue": activeTab === ALLOWED_TABS.info,
            }
          )}
          onClick={() => setActiveTab(ALLOWED_TABS.info)}
        >
          Seller Information
        </CardTitle>
      </div>

      <div className="mt-6 lg:mt-8">
        <Tab {...props} />
      </div>
    </SectionWrapper>
  );
};

export default ProductInfoSection;
