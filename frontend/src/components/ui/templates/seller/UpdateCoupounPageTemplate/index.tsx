import PageWrapper from "@/components/ui/atoms/PageWrapper";
import CoupounModal from "@/components/ui/organisms/Modals/CoupounModal";
import type { IAPICoupoun } from "@/types/api";
import { useNavigate } from "react-router";

interface UpdateCoupounPageTemplateProps {
  coupoun: IAPICoupoun;
}

const UpdateCoupounPageTemplate = ({
  coupoun,
}: UpdateCoupounPageTemplateProps) => {
  const navigate = useNavigate();

  const handleModal = () => {
    navigate("/seller/coupouns");
  };

  return (
    <PageWrapper className="px-2 lg:px-8">
      <CoupounModal
        isOpen={true}
        handleModal={handleModal}
        defaultValues={coupoun}
        id={coupoun?._id}
      />
    </PageWrapper>
  );
};

export default UpdateCoupounPageTemplate;
