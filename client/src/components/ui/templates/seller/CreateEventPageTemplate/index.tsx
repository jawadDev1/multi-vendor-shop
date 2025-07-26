import SellerPageWrapper from "@/components/ui/atoms/SellerPageWrapper";
import SectionTitle from "@/components/ui/atoms/typography/SectionTitle";
import EventForm from "@/components/ui/organisms/forms/EventForm";

interface CreateProductPageTemplateProps {
  products: { label: string; value: string }[];
}

const CreateEventPageTemplate = ({
  products,
}: CreateProductPageTemplateProps) => {
  return (
    <SellerPageWrapper className="px-2 lg:px-8">
      <SectionTitle className="text-center">Create Event</SectionTitle>
      <EventForm products={products} />
    </SellerPageWrapper>
  );
};

export default CreateEventPageTemplate;
