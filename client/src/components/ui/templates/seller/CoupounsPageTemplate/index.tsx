import TableShell from "@/components/Tables";
import TableCoupounActions from "@/components/Tables/elements/coupoun/CoupounActions";
import PageWrapper from "@/components/ui/atoms/PageWrapper";
import CreateCoupoun from "@/components/ui/organisms/forms/CreateCoupoun";
import { COUPOUN_ELEMENTS, COUPOUN_FIELDS } from "@/constants/tables_data";

interface Props {
  data: { [key: string]: unknown }[];
}

const CoupounsPageTemplate = ({ data }: Props) => {
  return (
    <>
      <PageWrapper>
        <div className="mb-7 flex justify-end">
          <CreateCoupoun />
        </div>

        <TableShell
          fields={COUPOUN_FIELDS}
          elements={COUPOUN_ELEMENTS}
          data={data}
          actions={TableCoupounActions}
        />
      </PageWrapper>
    </>
  );
};

export default CoupounsPageTemplate;
