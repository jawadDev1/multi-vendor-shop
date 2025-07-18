'use client';
import SignupPageTemplate from "@/components/ui/templates/SignUpPageTemplate";
import { useUserStore } from "@/stores/user-store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const SignupPage: React.FC = () => {
  const {isAuthenticated} = useUserStore()
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, []);

  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-page-bg">
      <SignupPageTemplate />
    </main>
  );
};

export default SignupPage;
