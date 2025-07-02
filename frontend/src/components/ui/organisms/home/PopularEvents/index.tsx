import { useAppDispatch, useAppSelector } from "@/app/hooks";
import SectionWrapper from "@/components/ui/atoms/SectionWrapper";

import SectionTitle from "@/components/ui/atoms/typography/SectionTitle";
import EventCard from "@/components/ui/molecules/Cards/EventCard";
import { loadPopularEvent } from "@/features/event/eventThunk";
import { useEffect } from "react";

const PopularEvents = () => {
  const { popular_event } = useAppSelector((state) => state.event);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!popular_event) {
      dispatch(loadPopularEvent());
    }
  }, []);

  if (!popular_event) return null;

  return (
    <SectionWrapper>
      <SectionTitle className="mb-7 lg:mb-8">Popular Events</SectionTitle>
      <EventCard event={popular_event} />
    </SectionWrapper>
  );
};

export default PopularEvents;
