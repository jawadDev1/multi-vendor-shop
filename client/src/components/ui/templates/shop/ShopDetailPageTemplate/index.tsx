import PageWrapper from "@/components/ui/atoms/PageWrapper";
import ShopAbout from "@/components/ui/molecules/ShopAbout";
import ShopDetailMenu from "@/components/ui/organisms/shop/ShopDetailMenu";
import type {
  IAPIShopDetails,
  IAPIUserEvent,
} from "@/types/api";

interface ShopDetailPageTemplateProps {
  shop: IAPIShopDetails;
  events: IAPIUserEvent[];
}

const ShopDetailPageTemplate = ({
  shop,
  events,
}: ShopDetailPageTemplateProps) => {
  

  const {
    shop_name,
    logo,
    address,
    contact,
    createdAt,
    products,
    slug,
    rating,
    totalProducts,
  } = shop;

  

  return (
    <PageWrapper className="grid grid-cols-1 lg:grid-cols-[30%,1fr] gap-5 max-w-[1200px] mx-auto">
      <ShopAbout
        {...{
          shop_name,
          logo,
          address: address!,
          contact,
          createdAt: createdAt!,
          rating,
          totalProducts,
        }}
      />

      <ShopDetailMenu events={events} products={products ?? []} slug={slug} />

    </PageWrapper>
  );
};

export default ShopDetailPageTemplate;
