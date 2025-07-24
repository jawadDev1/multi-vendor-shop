import SectionWrapper from "@/components/ui/atoms/SectionWrapper";

import SectionTitle from "@/components/ui/atoms/typography/SectionTitle";
import EventCard from "@/components/ui/molecules/Cards/EventCard";
import { IAPIUserPopularEventResponse } from "@/types/api";
import { getApiRequest } from "@/utils/api";
import { notFound } from "next/navigation";

const PopularEvents = async () => {
  const response: IAPIUserPopularEventResponse = await getApiRequest(
    "event/popular"
  );

  if (!response?.success || !response?.data) {
    return null;
  }
  const popular_event = response.data;

  return (
    <SectionWrapper>
      <SectionTitle className="mb-7 lg:mb-8">Popular Events</SectionTitle>
      <EventCard event={popular_event} />
    </SectionWrapper>
  );
};

export default PopularEvents;
