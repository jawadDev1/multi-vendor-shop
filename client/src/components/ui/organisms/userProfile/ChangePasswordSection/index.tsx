'use client';
import SpinnerButton from "@/components/ui/atoms/buttons/SpinnerButton";
import SectionTitle from "@/components/ui/atoms/typography/SectionTitle";
import InputWithLabel from "@/components/ui/molecules/form/InputWithLabel";
import {
  changePasswordSchema,
  type ChanngePasswordFormData,
} from "@/schemas/change_password.schema";
import { apiRequest } from "@/utils/api";
import { notifyError, notifySuccess } from "@/utils/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ChangePasswordSection = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChanngePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: ChanngePasswordFormData) => {
    setIsLoading(true);
    const result = await apiRequest({
      endpoint: "user/change-password",
      body: data,
      method: "PUT",
    });

    setIsLoading(false);
    if (!result.success) {
      notifyError(result?.message);
      return;
    }

    notifySuccess(result?.message);
    reset();
  };

  return (
    <>
      <div className="max-w-[600px] mx-auto w-full px-5 lg:px-0">
        <SectionTitle className="text-center">Change Password</SectionTitle>

        <div className="bg-card-bg py-5 lg:py-7 px-4 rounded-lg border border-light-gray shadow mt-7 w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" space-y-5 lg:space-y-6 "
          >
            <div>
              <InputWithLabel
                type="password"
                placeholder="********"
                label="Old Password"
                name="old_password"
                error={errors?.old_password}
                register={register}
                required
              />
            </div>

            <div>
              <InputWithLabel
                type="password"
                placeholder="********"
                label="New Password"
                name="new_password"
                error={errors?.new_password}
                register={register}
                required
              />
            </div>

            <div>
              <InputWithLabel
                type="password"
                placeholder="********"
                label="Confirm Password"
                name="confirm_password"
                error={errors?.confirm_password}
                register={register}
                required
              />
            </div>

            <SpinnerButton isLoading={isLoading}>Change</SpinnerButton>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordSection;
