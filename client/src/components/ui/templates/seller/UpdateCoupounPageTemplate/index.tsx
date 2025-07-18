'use client'
import PageWrapper from "@/components/ui/atoms/PageWrapper";
import CoupounModal from "@/components/ui/organisms/Modals/CoupounModal";
import type { IAPICoupoun } from "@/types/api";
import { useRouter } from "next/navigation";

interface UpdateCoupounPageTemplateProps {
  coupoun: IAPICoupoun;
}

const UpdateCoupounPageTemplate = ({
  coupoun,
}: UpdateCoupounPageTemplateProps) => {
  const router = useRouter();

  const handleModal = () => {
    router.push("/seller/coupouns");
  };

  return (
    <PageWrapper className="px-2 lg:px-8">
      { coupoun && <CoupounModal
        isOpen={true}
        handleModal={handleModal}
        defaultValues={coupoun}
        id={coupoun?._id}
      /> }
    </PageWrapper>
  );
};

export default UpdateCoupounPageTemplate;
