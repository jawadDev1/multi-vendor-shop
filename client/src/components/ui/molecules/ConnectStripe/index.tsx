"use client";
import React, { useState } from "react";
import { useUserStore } from "@/stores/user-store";
import { apiRequest  } from "@/utils/api";
import { notifyError } from "@/utils/toast";
import SpinnerButton from "../../atoms/buttons/SpinnerButton";

const ConnectStripe = () => {
  const { user } = useUserStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [accoutId, setAccountId] = useState<string | null>(null);

  const handleConnectStripe = async () => {
    setIsLoading(true);
    const result = await apiRequest({
      endpoint: "payment/account",
      body: { email: user?.email },
    });

    setIsLoading(false);
    if (!result?.success) {
      notifyError(result?.message);
      return;
    }

    setAccountId(result?.data);
  };

  const handleLinkAccount = async () => {
    if (!accoutId) return;
    setIsLoading(true);
    const result = await apiRequest({
      endpoint: "payment/account_link",
      body: { account: accoutId },
    });

    setIsLoading(false);
    if (!result?.success) {
      notifyError(result?.message);
      return;
    }

    const { url, error } = result?.data;

    if (url) {
      window.location.href = url;
    }

    if (error) {
      notifyError(error);
    }
  };

  return (
    <>
      {accoutId ? (
        <SpinnerButton
          isLoading={isLoading}
          onClick={handleLinkAccount}
          className="max-w-fit"
        >
          Link Account
        </SpinnerButton>
      ) : (
        <SpinnerButton
          isLoading={isLoading}
          onClick={handleConnectStripe}
          className="max-w-fit"
        >
          Create Stripe Account
        </SpinnerButton>
      )}
    </>
  );
};

export default ConnectStripe;
