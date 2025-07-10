import useGetData from "@/hooks/useGetData";
import EventsPageTemplate from "../../templates/EventsPageTemplate";
import type { IAPIUserEvent } from "@/types/api";
import Loader from "../../atoms/extra/Loader";


const EventsPage = () => {
  const { data, loading, error } = useGetData<IAPIUserEvent[]>({
    endpoint: `event/all-events`,
  });

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return null;
  }

  return (
    <>
      <EventsPageTemplate events={data} />
    </>
  );
};

export default EventsPage;
