import { useAppSelector } from "@/app/hooks";
import Loader from "@/components/ui/atoms/extra/Loader";
import PageWrapper from "@/components/ui/atoms/PageWrapper";
import LoginPageTemplate from "@/components/ui/templates/LoginPageTemplate";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const LoginPage: React.FC = () => {
  const { isAuthenticated, loading } = useAppSelector(
    (selector) => selector.user
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  if (loading) return <Loader />;

  return (
    <PageWrapper className="min-h-[70vh] flex items-center justify-center bg-page-bg">
      <LoginPageTemplate />
    </PageWrapper>
  );
};

export default LoginPage;
