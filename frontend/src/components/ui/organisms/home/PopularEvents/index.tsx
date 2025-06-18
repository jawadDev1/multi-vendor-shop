import SectionWrapper from "@/components/ui/atoms/SectionWrapper";

import SectionTitle from "@/components/ui/atoms/typography/SectionTitle";
import EventCard from "@/components/ui/molecules/Cards/EventCard";

const PopularEvents = () => {
  return (
    <SectionWrapper>
      <SectionTitle className="mb-7 lg:mb-8">Popular Events</SectionTitle>
      <EventCard />
    </SectionWrapper>
  );
};

export default PopularEvents;
