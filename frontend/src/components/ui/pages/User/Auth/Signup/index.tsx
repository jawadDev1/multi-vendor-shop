import SignupPageTemplate from "@/components/ui/templates/SignUpPageTemplate";
import React from "react";

const SignupPage: React.FC = () => {
  return (
    <main className="min-h-[90vh] flex items-center justify-center bg-page-bg">
      <SignupPageTemplate />
    </main>
  );
};

export default SignupPage;
