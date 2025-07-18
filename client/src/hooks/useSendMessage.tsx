'use client';
import { useUserStore } from "@/stores/user-store";
import { apiRequest } from "@/utils/api";
import { notifyError } from "@/utils/toast";
import { useRouter } from "next/navigation";

interface UseSendMessageProps {
  created_by: string;
}

const useSendMessage = ({ created_by }: UseSendMessageProps) => {
  const router = useRouter();
  const { isAuthenticated } = useUserStore();

  const handleSendMessage = async () => {
    if (!isAuthenticated) return notifyError("Login to use this feature");

    const sellerId = created_by;
    const result = await apiRequest({
      endpoint: "conversation/create",
      body: { sellerId },
    });

    if (!result?.success) {
      notifyError(result?.message);
      return;
    }

   router.push(`/converstion/${result?.data._id}`);
  };

  return { handleSendMessage };
};

export default useSendMessage;
