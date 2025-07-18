import { getServerApiRequest } from "@/actions/api";
import SellerEventPageTemplate from "@/components/ui/templates/seller/EventsPageTemplate";
import { notFound } from "next/navigation";

const SellerEventPage = async () => {
  const result = await getServerApiRequest('event/get-seller-events')

  if(!result?.success) {
    return notFound();
  }
 
  const sellerEvents = result?.data;
  return (
    <>
      <SellerEventPageTemplate
        key={sellerEvents?.length}
        data={sellerEvents as any}
      />
    </>
  );
};

export default SellerEventPage;
