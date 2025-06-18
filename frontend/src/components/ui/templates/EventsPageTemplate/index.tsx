import PageWrapper from "../../atoms/PageWrapper";
import EventCard from "../../molecules/Cards/EventCard";

const EventsPageTemplate = () => {
  return (
    <PageWrapper className="flex flex-col gap-y-10 lg:gap-y-20">
      <EventCard />
      <EventCard />
      <EventCard />
    </PageWrapper>
  );
};

export default EventsPageTemplate;
