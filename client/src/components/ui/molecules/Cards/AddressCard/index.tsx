"use client";
import Subtitle2 from "@/components/ui/atoms/typography/Subtitle2";
import { CgTrash } from "react-icons/cg";
import CardTitle from "@/components/ui/atoms/typography/CardTitle";
import Content from "@/components/ui/atoms/typography/Content";
import { BiEdit } from "react-icons/bi";
import type { IAddress } from "@/types/api";

import { useState } from "react";
import CreateAddressModal from "@/components/ui/organisms/Modals/CreateAddressModal";
import { deleteApiRequest } from "@/utils/api";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useUserStore } from "@/stores/user-store";

interface AddressCardProps {
  addr: IAddress;
}

const AddressCard = ({ addr }: AddressCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { updateUser } = useUserStore();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDelete = async () => {
    const result = await deleteApiRequest(`user/delete-address/${addr._id}`);

    if (!result?.success) {
      notifyError(result?.message);
      return;
    }

    notifySuccess(result?.message);
    updateUser(result.data);
  };

  return (
    <>
      {isModalOpen && (
        <CreateAddressModal
          defaultValues={addr}
          id={addr._id}
          isOpen={isModalOpen}
          handleModal={toggleModal}
        />
      )}
      <div className="bg-white shadow rounded-md py-3 px-3 items-center grid grid-cols-[10%,15%,1fr,10%] ">
        <Subtitle2 className="capitalize">{addr.address_type}</Subtitle2>

        <CardTitle>{addr.country}</CardTitle>

        <Content>
          {addr.address1}, {addr.address2}
        </Content>

        <div className="flex items-center gap-x-2">
          <BiEdit
            onClick={toggleModal}
            size={28}
            className="cursor-pointer text-green-600 "
          />
          <CgTrash
            onClick={handleDelete}
            size={28}
            color="red"
            className="cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};

export default AddressCard;
