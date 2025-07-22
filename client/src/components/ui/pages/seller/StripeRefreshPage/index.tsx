"use client";
import SellerPageWrapper from "@/components/ui/atoms/SellerPageWrapper";
import SectionTitle from "@/components/ui/atoms/typography/SectionTitle";
import Subtitle3 from "@/components/ui/atoms/typography/Subtitle3";
import React, { useState } from "react";

const StripeRefreshPage = ({
  connectedAccountId,
}: {
  connectedAccountId: string;
}) => {
  const [accountLinkCreatePending, setAccountLinkCreatePending] =
    useState(false);
  const [error, setError] = useState(false);

  React.useEffect(() => {
    if (connectedAccountId) {
      setAccountLinkCreatePending(true);
      fetch("/account_link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          account: connectedAccountId,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          setAccountLinkCreatePending(false);

          const { url, error } = json;

          if (url) {
            window.location.href = url;
          }

          if (error) {
            setError(true);
          }
        });
    }
  }, [connectedAccountId]);

  return (
    <SellerPageWrapper className="text-center">
      <SectionTitle className="text-primary mb-4">
        Wait Account is Connecting....
      </SectionTitle>
    </SellerPageWrapper>
  );
};

export default StripeRefreshPage;
