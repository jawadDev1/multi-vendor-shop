
import { getServerApiRequest } from "@/actions/api";
import CoupounsPageTemplate from "@/components/ui/templates/seller/CoupounsPageTemplate";

const CoupounPage = async () => {
  const result = await getServerApiRequest('coupoun/get-seller-coupouns')

  const data = result?.data;

  return (
    <>
      <CoupounsPageTemplate
        data={data ? (data as unknown as { [key: string]: unknown }[]) : []}
      />
    </>
  );
};

export default CoupounPage;
