import Loader from "@/components/ui/atoms/extra/OrderSuccess";
import UpdateCoupounPageTemplate from "@/components/ui/templates/seller/UpdateCoupounPageTemplate";
import UpdateProductPageTemplate from "@/components/ui/templates/seller/UpdateProductPageTemplate";
import { getApiRequest } from "@/utils/api";
import { notifyError } from "@/utils/toast";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const UpdateCoupounPage = () => {
  const { id } = useParams();
  const [coupoun, setCoupoun] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      let coupounResult = await getApiRequest(`coupoun/get-single/${id}`);

      if (!coupounResult?.success) {
        notifyError(coupounResult?.message);
        navigate("/seller/coupouns");
        return;
      }

      setCoupoun(coupounResult.data);
    })();
  }, []);

  if (!coupoun) {
    return <Loader />;
  }

  return (
    <>
      <UpdateCoupounPageTemplate coupoun={coupoun} />
    </>
  );
};

export default UpdateCoupounPage;
