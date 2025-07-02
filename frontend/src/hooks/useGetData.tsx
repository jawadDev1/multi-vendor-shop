import { getApiRequest } from "@/utils/api";
import { useEffect, useState } from "react";

interface UseGetDataProps<T> {
  endpoint: string;
  dependencies?: unknown[];
}

const useGetData = <T,>({
  endpoint,
  dependencies = [],
}: UseGetDataProps<T>) => {
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
  }, dependencies);

  return { loading, data, error };
};

export default useGetData;
