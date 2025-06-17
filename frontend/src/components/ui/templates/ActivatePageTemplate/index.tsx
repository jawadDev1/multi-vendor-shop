import React from "react";
import Button from "../../atoms/buttons/Button";
import { useNavigate, useParams } from "react-router";
import { notifyError, notifySuccess } from "@/utils/toast";
import { postApiRequest } from "@/utils/api";

const ActivatePageTemplate = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const handleVerify = async () => {
    const result = await postApiRequest("user/activate", { token });
    console.log('result ========> ', result)
    if (!result?.success) {
      notifyError(result?.message);
      navigate("/login");
      return;
    }

    notifySuccess("Account activated successfully");
    navigate("/login");
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
