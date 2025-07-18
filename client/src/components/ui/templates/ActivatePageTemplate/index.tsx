import Button from "../../atoms/buttons/Button";
import { notifyError, notifySuccess } from "@/utils/toast";
import { apiRequest } from "@/utils/api";
import { useRouter } from "next/navigation";

const ActivatePageTemplate = ({token}: {token: string}) => {
  const router = useRouter();

  const handleVerify = async () => {
    const result = await apiRequest({
      endpoint: "user/activate",
      body: { token },
    });
    if (!result?.success) {
      notifyError(result?.message);
      router.push("/login");
      return;
    }

    notifySuccess("Account activated successfully");
    router.push("/login");
  };

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="max-w-[600px] py-8 px-3 w-full shadow-md border rounded-md">
        <h3 className="text-lg text-center my-3">
          Click on the below button to verify your account
        </h3>
        <Button onClick={handleVerify}>Verify</Button>
      </div>
    </div>
  );
};

export default ActivatePageTemplate;
