import PageWrapper from "@/components/ui/atoms/PageWrapper";
import SectionTitle from "@/components/ui/atoms/typography/SectionTitle";
import EventForm from "@/components/ui/organisms/forms/EventForm";

interface CreateProductPageTemplateProps {
  products: { label: string; value: string }[];
}

const CreateEventPageTemplate = ({
  products,
}: CreateProductPageTemplateProps) => {
  return (
    <PageWrapper className="px-2 lg:px-8">
      <SectionTitle className="text-center">Create Event</SectionTitle>
      <EventForm products={products} />
    </PageWrapper>
  );
};

export default CreateEventPageTemplate;
