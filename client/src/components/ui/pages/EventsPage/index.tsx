import EventsPageTemplate from "../../templates/EventsPageTemplate";
import type { IAPIUserEvent } from "@/types/api";
import Loader from "../../atoms/extra/Loader";
import { getApiRequest } from "@/utils/api";
import { notFound } from "next/navigation";

const EventsPage = async () => {
    const result = await getApiRequest("event/all-events");

    if (!result?.success) {
        return notFound();
    }

    const data = result.data;

    // const { data, loading, error } = useGetData<IAPIUserEvent[]>({
    //   endpoint: `event/all-events`,
    // });

    // if (loading) {
    //   return <Loader />;
    // }

    // if (error || !data) {
    //   return null;
    // }

    return (
        <>
            <EventsPageTemplate events={data} />
        </>
    );
};

export default EventsPage;
