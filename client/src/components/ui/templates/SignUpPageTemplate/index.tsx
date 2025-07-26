"use client";
import { signupSchema, type SignupFormData } from "@/schemas/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SectionTitle from "@/components/ui/atoms/typography/SectionTitle/index";
import InputWithLabel from "../../molecules/form/InputWithLabel";
import FileInputWithPreview from "../../molecules/form/FileInputWithPreview";
import { uploadImageToAppwrite } from "@/utils/uploadFile";
import { useState } from "react";
import { notifyError } from "@/utils/toast";
import ActivateAccountModal from "../../organisms/Modals/ActivateAccoutModal";
import { apiRequest } from "@/utils/api";
import SpinnerButton from "../../atoms/buttons/SpinnerButton";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignupPageTemplate: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = async (data: SignupFormData) => {
    const file = data.profile;
    setIsLoading(true);
    try {
      const url = await uploadImageToAppwrite(file);

      const result = await apiRequest({
        endpoint: `user/signup`,
        body: {
          ...data,
          profile: url,
        },
      });

      if (!result?.success) {
        notifyError(result?.message);
        setIsLoading(false);
        return;
      }

      setIsModalOpen(true);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error("Upload failed:", err);
    }
  };

  const handleModal = () => {
    setIsModalOpen(false);
   router.push("/login");
  };


  return (
    <>
      <ActivateAccountModal isOpen={isModalOpen} handleModal={handleModal} />
      <div className="max-w-[600px] mx-auto w-full px-5 lg:px-0">
        <SectionTitle className="text-center">Sign up</SectionTitle>

        <div className="bg-white py-5 lg:py-7 px-4 rounded-lg border border-light-gray shadow mt-7 w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" space-y-5 lg:space-y-6 "
          >
            <div>
              <InputWithLabel
                type="text"
                placeholder="Uzumaki Naruto"
                label="Name"
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
                type="password"
                placeholder="*****"
                label="Password"
                name="password"
                error={errors?.password}
                register={register}
                required
              />
            </div>

            <div className="">
              <FileInputWithPreview
                name="profile"
                error={errors?.profile}
                register={register}
                setValue={setValue}
                required={true}
                label="Profile"
                id="profile"
                accept=".jpg,.jpeg,.png"
              />
            </div>

            <SpinnerButton isLoading={isLoading}>Signup</SpinnerButton>
          </form>

          <div className="mt-5 text-center">
            <p className="text-sm text-charcoal-gray">
              Already have an account?{" "}
              <Link href={"/login"} className="text-azure-blue">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPageTemplate;
