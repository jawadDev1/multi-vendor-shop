"use client";
import SellerPageWrapper from "@/components/ui/atoms/SellerPageWrapper";
import SectionTitle from "@/components/ui/atoms/typography/SectionTitle";
import Subtitle3 from "@/components/ui/atoms/typography/Subtitle3";
import { apiRequest } from "@/utils/api";
import { notifyError } from "@/utils/toast";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const StripeReturnPage = ({ id }: { id: string }) => {
  const router = useRouter();
  useEffect(() => {
    if (id) {
      (async () => {
        const result = await apiRequest({
          endpoint: "payment/activate",
          body: { account_id: id },
        });

        if (!result?.success) {
          notifyError(result?.message);
          return;
        }

        router.refresh();

      })();
    }
  }, [id]);

  return (
    <SellerPageWrapper className="text-center">
      <SectionTitle className="text-primary mb-4">
        Congratulations!
      </SectionTitle>

      <Subtitle3>
        Your stripe account is connected successfully now you can sell products
      </Subtitle3>
    </SellerPageWrapper>
  );
};

export default StripeReturnPage;
