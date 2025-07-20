import type { IAPIUserEvent } from "@/types/api";
import PageWrapper from "../../atoms/PageWrapper";
import EventCard from "../../molecules/Cards/EventCard";

interface EventsPageTemplateProps {
  events: IAPIUserEvent[] | null;
}

const EventsPageTemplate = ({ events }: EventsPageTemplateProps) => {
  return (
    <PageWrapper className="flex flex-col gap-y-10 lg:gap-y-20 px-5 lg:px-1">
      {events &&
        events.length > 0 &&
        events.map((event) => (
          <EventCard key={event.product.slug} event={event} />
        ))}
    </PageWrapper>
  );
};

export default EventsPageTemplate;
