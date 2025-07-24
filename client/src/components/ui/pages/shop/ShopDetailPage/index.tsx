import ShopDetailPageTemplate from "@/components/ui/templates/shop/ShopDetailPageTemplate";
import { getApiRequest } from "@/utils/api";
import { notFound } from "next/navigation";

const ShopDetailPage = async ({slug}: {slug: string}) => {
  const result = await getApiRequest(`shop/get-shop-details/${slug}`);

  if(!result?.success) {
    return notFound();
  }

    const { shop, events } = result?.data;

  return (
    <>
      <ShopDetailPageTemplate shop={shop} events={events} />
    </>
  );
};

export default ShopDetailPage;
