import { getApiRequest } from "@/utils/api";
import { useEffect, useState } from "react";

interface UseGetDataProps<T> {
  endpoint: string;
}

const useGetData = <T,>({ endpoint }: UseGetDataProps<T>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setDate] = useState<T | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await getApiRequest(endpoint);
      setLoading(false);
      if (!result.success) {
        setError(result?.message);
        return;
      }

      setDate(result?.data);
    })();
  }, []);

  return { loading, data, error };
};

export default useGetData;
