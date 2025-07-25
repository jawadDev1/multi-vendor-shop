import EventsPageTemplate from "../../templates/EventsPageTemplate";
import { getApiRequest } from "@/utils/api";
import { notFound } from "next/navigation";

const EventsPage = async () => {
    const result = await getApiRequest("event/all-events");

    if (!result?.success) {
        return notFound();
    }

    const data = result.data;
    return (
        <>
            <EventsPageTemplate events={data} />
        </>
    );
};

export default EventsPage;
