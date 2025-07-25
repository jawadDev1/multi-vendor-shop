'use client';
import Button from "@/components/ui/atoms/buttons/Button";

import SectionTitle from "@/components/ui/atoms/typography/SectionTitle";

import CreateAddressModal from "../../Modals/CreateAddressModal";
import { useState } from "react";
import AddressCard from "@/components/ui/molecules/Cards/AddressCard";
import { useUserStore } from "@/stores/user-store";

const AddressSection = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { user } = useUserStore();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const addresses = user?.addresses;

  return (
    <>
      <div className="flex justify-between items-center gap-x-4 ">
        <SectionTitle>Addresses</SectionTitle>

        <Button onClick={toggleModal} className="bg-primary max-w-[160px] ">
          Add new
        </Button>
      </div>

      {addresses && addresses.length > 0 && (
        <div key={user?.updatedAt} className="mt-10 lg:mt-20 space-y-6">
          {addresses.map((addr) => (
            <AddressCard key={addr.zip_code} addr={addr} />
          ))}
        </div>
      )}

      <CreateAddressModal isOpen={isModalOpen} handleModal={toggleModal} />
    </>
  );
};

export default AddressSection;
