"use client";
import Button from "@/components/ui/atoms/buttons/Button";
import React, { useState } from "react";
import CoupounModal from "../../Modals/CoupounModal";
import { useRouter } from "next/navigation";

const CreateCoupoun = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
    const router = useRouter();

  const handleModal = () => {
    setIsOpen(!isOpen);
    router.refresh()
  };

  return (
    <>
      <Button onClick={handleModal} className="max-w-[200px] bg-primary">
        Create
      </Button>
      {isOpen && <CoupounModal isOpen={isOpen} handleModal={handleModal} />}
    </>
  );
};

export default CreateCoupoun;
