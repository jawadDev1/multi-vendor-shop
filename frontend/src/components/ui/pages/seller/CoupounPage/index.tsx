import Loader from "@/components/ui/atoms/extra/OrderSuccess";
import CoupounsPageTemplate from "@/components/ui/templates/seller/CoupounsPageTemplate";
import useGetData from "@/hooks/useGetData";
import type { IAPICoupoun } from "@/types/api";

const CoupounPage = () => {
  const { loading, data } = useGetData<IAPICoupoun>({
    endpoint: "coupoun/get-seller-coupouns",
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <CoupounsPageTemplate
        data={data ? (data as unknown as { [key: string]: unknown }[]) : []}
      />
    </>
  );
};

export default CoupounPage;
