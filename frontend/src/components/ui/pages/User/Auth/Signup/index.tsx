import { useAppSelector } from "@/app/hooks";
import SignupPageTemplate from "@/components/ui/templates/SignUpPageTemplate";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const SignupPage: React.FC = () => {
  const { isAuthenticated } = useAppSelector((selector) => selector.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);

  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-page-bg">
      <SignupPageTemplate />
    </main>
  );
};

export default SignupPage;
