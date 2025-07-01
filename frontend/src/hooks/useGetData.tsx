import { getApiRequest } from "@/utils/api";
import { notifyError } from "@/utils/toast";
import { useEffect, useState } from "react";

interface Props {
  endpoint: string;
}

const useGetData = ({ endpoint }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setDate] = useState<{ [key: string]: unknown }[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await getApiRequest(endpoint);
      setLoading(false);
      if (!result.success) {
        notifyError(result?.message || "Something went wrong");
        return;
      }

      setDate(result?.data);
    })();
  }, []);

  return { loading, data };
};

export default useGetData;
