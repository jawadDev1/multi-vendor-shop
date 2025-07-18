import ActivatePageTemplate from "@/components/ui/templates/ActivatePageTemplate";
import React from "react";

const ActivateAccout = ({token}: {token: string}) => {
  return (
    <>
      <ActivatePageTemplate token={token} />
    </>
  );
};

export default ActivateAccout;
