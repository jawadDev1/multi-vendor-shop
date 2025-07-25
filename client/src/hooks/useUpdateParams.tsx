"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Param = {
  key: string;
  value: string | undefined;
};

export const useUpdateSearchParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = (params: Param[] | Param, route?: string) => {
    const current = new URLSearchParams(searchParams.toString());

    const updates = Array.isArray(params) ? params : [params];

    for (const { key, value } of updates) {
      if (value === undefined || value === "") {
        current.delete(key);
      } else {
        current.set(key, value);
      }
    }

    const newQuery = current.toString();
    router.push(`${route?? ""}?${newQuery}`, { scroll: false });
  };

  const clearParams = () => {
    router.push(window.location.pathname, { scroll: false });
  };

  return { updateParams, clearParams };
};
