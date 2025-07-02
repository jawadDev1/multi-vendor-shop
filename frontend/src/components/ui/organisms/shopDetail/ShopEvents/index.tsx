import Content from "@/components/ui/atoms/typography/Content";
import EventCardSm from "@/components/ui/molecules/Cards/EventCardSm";
import type { IAPIUserEvent } from "@/types/api";

interface ShopEventsProps {
  events: IAPIUserEvent[];
}

const ShopEvents = ({ events }: ShopEventsProps) => {
  return (
    <>
      {events && events.length > 0 && (
        <div className="flex flex-col gap-5 justify-center max-w-full overflow-hidden">
          {events &&
            events.length > 0 &&
            events.map((event) => (
              <EventCardSm key={event.end_date} event={event} />
            ))}
        </div>
      )}

      {events && events.length == 0 && <Content>No events</Content>}
    </>
  );
};

export default ShopEvents;
