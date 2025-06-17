import LoginPageTemplate from "@/components/ui/templates/LoginPageTemplate";
import React from "react";

const LoginPage: React.FC = () => {
  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-page-bg">
      <LoginPageTemplate />
    </main>
  );
};

export default LoginPage;
