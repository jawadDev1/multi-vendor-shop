"use client";
import { apiRequest } from "@/utils/api";
import { notifyError } from "@/utils/toast";
import React, { useEffect } from "react";

const StripeReturnPage = ({ id }: { id: string }) => {
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
      })();
    }
  }, [id]);

  return (
    <div className="container">
      <div className="banner">
        <h2>Nexora</h2>
      </div>
      <div className="content">
        <h2>Details submitted</h2>
        <p>That's everything we need for now</p>
      </div>
      <div className="info-callout">
        <p>
          This is a sample app for Stripe-hosted Connect onboarding.{" "}
          <a
            href="https://docs.stripe.com/connect/onboarding/quickstart?connect-onboarding-surface=hosted"
            target="_blank"
            rel="noopener noreferrer"
          >
            View docs
          </a>
        </p>
      </div>
    </div>
  );
};

export default StripeReturnPage;
