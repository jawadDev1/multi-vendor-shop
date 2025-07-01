import Loader from "@/components/ui/atoms/extra/Loader";
import CoupounsPageTemplate from "@/components/ui/templates/seller/CoupounsPageTemplate";
import useGetData from "@/hooks/useGetData";

const CoupounPage = () => {
  const { loading, data } = useGetData({
    endpoint: "coupoun/get-seller-coupouns",
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <CoupounsPageTemplate data={data} />
    </>
  );
};

export default CoupounPage;
