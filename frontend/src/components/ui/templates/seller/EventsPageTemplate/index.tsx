import TableShell from "@/components/Tables";
import TableEventActions from "@/components/Tables/elements/event/EventActions";
import PageWrapper from "@/components/ui/atoms/PageWrapper";
import { Event_ELEMENTS, Event_FIELDS } from "@/constants/tables_data";
import type { IAPISellerEvent } from "@/types/api";

interface EventPageTemplateProps {
  data: IAPISellerEvent & { [key: string]: unknown }[];
}

const SellerEventPageTemplate = ({ data }: EventPageTemplateProps) => {
  return (
    <PageWrapper>
      <TableShell
        fields={Event_FIELDS}
        elements={Event_ELEMENTS}
        data={data}
        actions={TableEventActions}
      />
    </PageWrapper>
  );
};

export default SellerEventPageTemplate;
