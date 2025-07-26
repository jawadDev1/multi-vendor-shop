import PageWrapper from "@/components/ui/atoms/PageWrapper";
import SellerPageWrapper from "@/components/ui/atoms/SellerPageWrapper";
import SectionTitle from "@/components/ui/atoms/typography/SectionTitle";
import EventForm from "@/components/ui/organisms/forms/EventForm";
import { convertStringToDate } from "@/utils";

interface Props {
  products: { label: string; value: string }[];
  event: { _id: string; start_date: string; end_date: string; product: string };
}

const UpdateSellerEventPageTemplate = ({ products, event }: Props) => {
  const defaultValues = {
    product: event.product,
    start_date: convertStringToDate(event.start_date),
    end_date: convertStringToDate(event.end_date),
  };

  return (
    <SellerPageWrapper className="px-2 lg:px-8">
      <SectionTitle className="text-center">Update Event</SectionTitle>
      <EventForm
        products={products}
        defaultValues={defaultValues}
        id={event?._id}
      />
    </SellerPageWrapper>
  );
};

export default UpdateSellerEventPageTemplate;
