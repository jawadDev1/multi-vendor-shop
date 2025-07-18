'use client';
import Loader from "@/components/ui/atoms/extra/Loader";
import PageWrapper from "@/components/ui/atoms/PageWrapper";
import LoginPageTemplate from "@/components/ui/templates/LoginPageTemplate";
import { useUserStore } from "@/stores/user-store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const LoginPage: React.FC = () => {
  
  const {isAuthenticated, loading} = useUserStore()
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
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
