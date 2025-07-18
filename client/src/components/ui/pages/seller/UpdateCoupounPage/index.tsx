
import { getServerApiRequest } from "@/actions/api";
import UpdateCoupounPageTemplate from "@/components/ui/templates/seller/UpdateCoupounPageTemplate";

import { notFound } from "next/navigation";

const UpdateCoupounPage = async ({id}: {id: string}) => {
  const result  = await getServerApiRequest(`coupoun/get-single/${id}`)
  
  if(!result?.success) {
    return notFound();
  }

  const coupoun = result?.data

  return (
    <>
      <UpdateCoupounPageTemplate coupoun={coupoun} />
    </>
  );
};

export default UpdateCoupounPage;
