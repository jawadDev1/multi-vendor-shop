import { useAppSelector } from "@/app/hooks";
import { apiRequest } from "@/utils/api";
import { notifyError } from "@/utils/toast";
import { useNavigate } from "react-router";

interface UseSendMessageProps {
  created_by: string;
}

const useSendMessage = ({ created_by }: UseSendMessageProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.user);

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

    navigate(`/converstion/${result?.data._id}`);
  };

  return { handleSendMessage };
};

export default useSendMessage;
