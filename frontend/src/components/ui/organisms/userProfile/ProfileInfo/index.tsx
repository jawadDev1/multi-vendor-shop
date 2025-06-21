import Button from "@/components/ui/atoms/buttons/Button";
import Image from "@/components/ui/atoms/common/Image";

import InputWithLabel from "@/components/ui/molecules/form/InputWithLabel";
import {
  userProfileSchema,
  type UserProfileData,
} from "@/schemas/user_profile.shcema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import { AiOutlineEdit } from "react-icons/ai";
import { useState } from "react";
import type { IAPIUser } from "@/types/api";

interface ProfileInfoProps {
  user: IAPIUser;
}

const ProfileInfo = ({ user }: ProfileInfoProps) => {
  const defaultValues = user ? { name: user.name, email: user.email } : {};

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<UserProfileData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues,
  });
  const [preview, setPreview] = useState<string>(
    user?.profile ?? "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
  );

  const onSubmit = (data: UserProfileData) => {
    console.log("Data ==================> ", data);
  };

  const handleProfileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target?.files && e.target.files[0];
    if (!file) return;

    setValue("profile", file);
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
            {...register("profile")}
            type="file"
            className="hidden"
            onChange={handleProfileChange}
          />

          <Image src={preview} className="rounded-full overflow-hidden" />
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
        <div>
          <InputWithLabel
            type="number"
            placeholder="28932"
            label="Zip Code"
            name="zip_code"
            register={register}
            error={errors?.zip_code}
            required
          />
        </div>
        <div>
          <InputWithLabel
            type="text"
            placeholder="address"
            label="Address 1"
            name="address1"
            register={register}
            error={errors?.address1}
            required
          />
        </div>
        <div>
          <InputWithLabel
            type="text"
            placeholder="address"
            label="Address 2"
            name="address2"
            register={register}
            error={errors?.address2}
          />
        </div>

        {/* <DevTool control={control} /> */}

        <div className="col-span-full">
          <Button>Update</Button>
        </div>
      </form>
    </>
  );
};

export default ProfileInfo;
