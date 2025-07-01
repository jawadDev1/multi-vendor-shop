import TableShell from "@/components/Tables";
import TableCoupounActions from "@/components/Tables/elements/coupoun/CoupounActions";
import Button from "@/components/ui/atoms/buttons/Button";
import PageWrapper from "@/components/ui/atoms/PageWrapper";
import CoupounModal from "@/components/ui/organisms/Modals/CoupounModal";
import { COUPOUN_ELEMENTS, COUPOUN_FIELDS } from "@/constants/tables_data";
import { useState } from "react";

interface Props {
  data: { [key: string]: unknown }[];
}

const CoupounsPageTemplate = ({ data }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <PageWrapper>
        <div className="mb-7 flex justify-end">
          <Button onClick={handleModal} className="max-w-[200px] bg-primary">
            Create
          </Button>
        </div>

        <TableShell
          fields={COUPOUN_FIELDS}
          elements={COUPOUN_ELEMENTS}
          data={data}
          actions={TableCoupounActions}
        />
      </PageWrapper>

      <CoupounModal isOpen={isOpen} handleModal={handleModal} />
    </>
  );
};

export default CoupounsPageTemplate;
