import BestSellingPageTemplate from "../../templates/BestSellingPageTemplate";
import type { IAPIUserProduct } from "@/types/api";
import useGetData from "@/hooks/useGetData";
import Loader from "../../atoms/extra/Loader";
import { getApiRequest } from "@/utils/api";
import { notFound } from "next/navigation";


const BestSellingPage = async () => {
  const result = await getApiRequest("product/best-selling");

    if(!result?.success) {
      return notFound();
    }

    const data = result.data;

  return (
    <>
      <BestSellingPageTemplate products={data} />
    </>
  );
};

export default BestSellingPage;
