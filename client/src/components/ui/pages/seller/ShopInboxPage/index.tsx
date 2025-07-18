import { getServerApiRequest } from "@/actions/api";
import ShopInboxPageTemplate from "@/components/ui/templates/seller/ShopInboxPageTemplate";
import { notFound } from "next/navigation";

const ShopInboxPage = async () => {
  const result = await getServerApiRequest(`conversation/seller-conversations`)

  if(!result?.success) {
    return notFound();
  }

  const conversations = result?.data

  return (
    <>
      <ShopInboxPageTemplate conversations={conversations!} />
    </>
  );
};

export default ShopInboxPage;
