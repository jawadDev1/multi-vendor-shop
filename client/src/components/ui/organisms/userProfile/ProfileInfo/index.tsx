"use client";
import NextImage from "@/components/ui/atoms/common/NextImage";

import InputWithLabel from "@/components/ui/molecules/form/InputWithLabel";
import {
  userProfileSchema,
  type UserProfileData,
} from "@/schemas/user_profile.shcema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AiOutlineEdit } from "react-icons/ai";
import { useEffect, useState } from "react";
import type { IAPIUser } from "@/types/api";
import { notifyError, notifySuccess } from "@/utils/toast";
import { uploadImageToAppwrite } from "@/utils/uploadFile";
import { apiRequest } from "@/utils/api";
import SpinnerButton from "@/components/ui/atoms/buttons/SpinnerButton";
import { useUserStore } from "@/stores/user-store";

interface ProfileInfoProps {}

const ProfileInfo = ({}: ProfileInfoProps) => {
  const [newProfile, setNewProfile] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const { user, updateUser } = useUserStore();

  const [preview, setPreview] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserProfileData>({
    resolver: zodResolver(userProfileSchema),
  });


  useEffect(() => {
    if(user) {

      setPreview(user?.profile);
      const defaultValues = { name: user.name, email: user.email, contact: user.contact };
      reset(defaultValues);
    }
  }, [user])

  const onSubmit = async (data: UserProfileData) => {
    setIsLoading(true);
    try {
      let payload: {
        profile?: string;
        email: string;
        name: string;
        contact: number;
      } = { ...data, email: user?.email! };

      if (newProfile) {
        const url = await uploadImageToAppwrite(newProfile);
        payload["profile"] = url;
      }

      const result = await apiRequest({
        endpoint: `user/update-profile`,
        body: payload,
      });

      if (!result?.success) {
        notifyError(result?.message);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);

      updateUser(result?.data);
      notifySuccess("profile updated successfully");
    } catch (err) {
      setIsLoading(false);
      console.error("Upload failed:", err);
    }
  };

  const handleProfileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target?.files && e.target.files[0];
    if (!file) return;
    setNewProfile(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 "
      >
        <label
          htmlFor="profile"
          className="size-28 rounded-full lg:size-32  mx-auto border-2 border-green-500 col-span-full mb-6 lg:mb-8 relative cursor-pointer "
        >
          <input
            id="profile"
            type="file"
            className="hidden"
            onChange={handleProfileChange}
          />

          <NextImage
            src={preview}
            className="rounded-full overflow-hidden  object-cover"
          />
          <span className="absolute bg-gray-100 rounded-full right-0 bottom-0 z-10">
            <AiOutlineEdit size={28} />
          </span>
        </label>

        <div>
          <InputWithLabel
            type="text"
            placeholder="enter name"
            label="Full Name"
            name="name"
            register={register}
            error={errors?.name}
            required
          />
        </div>
        <div>
          <InputWithLabel
            type="email"
            placeholder="example@gmail.com"
            label="Email"
            name="email"
            register={register}
            error={errors?.email}
            required
            disabled
          />
        </div>
        <div>
          <InputWithLabel
            type="number"
            placeholder="923019234829"
            label="Contact"
            name="contact"
            register={register}
            error={errors?.contact}
            required
          />
        </div>

        {/* <DevTool control={control} /> */}

        <div className="col-span-full">
          <SpinnerButton isLoading={isLoading}>Update</SpinnerButton>
        </div>
      </form>
    </>
  );
};

export default ProfileInfo;
