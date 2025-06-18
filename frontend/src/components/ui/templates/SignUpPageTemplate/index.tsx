import { signupSchema, type SignupFormData } from "@/schemas/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SectionTitle from "@/components/ui/atoms/typography/SectionTitle/index";
import InputWithLabel from "../../molecules/form/InputWithLabel";
import Button from "../../atoms/buttons/Button";
import { Link, useNavigate } from "react-router";
import FileInputWithPreview from "../../molecules/form/FileInputWithPreview";
import { uploadImageToAppwrite } from "@/utils/uploadFile";
import { useState } from "react";
import Spinner from "../../atoms/extra/Spinner";
import { notifyError, notifySuccess } from "@/utils/toast";
import { API_URL } from "@/constants/index";
import ActivateAccountModal from "../../organisms/Modals/ActivateAccoutModal";

const SignupPageTemplate: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = async (data: SignupFormData) => {
    const file = data.profile;
    setIsLoading(true);
    try {
      const url = await uploadImageToAppwrite(file);

      const res = await fetch(`${API_URL}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, profile: url }),
      });

      const result = await res.json();

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
    navigate("/login");
  };

  return (
    <>
      <ActivateAccountModal isOpen={isModalOpen} handleModal={handleModal} />
      <div className="max-w-[600px] mx-auto w-full px-5 lg:px-0">
        <SectionTitle className="text-center">Sign up</SectionTitle>

        <div className="bg-card-bg py-5 lg:py-7 px-4 rounded-lg border border-light-gray shadow mt-7 w-full">
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

            <div className="flex items-center gap-x-5">
              <FileInputWithPreview
                name="profile"
                error={errors?.profile}
                register={register}
                setValue={setValue}
                required
                id="profile"
                accept=".jpg,.jpeg,.png"
              />
            </div>

            <Button>
              {isLoading ? <Spinner className="border-white" /> : "Signup"}
            </Button>
          </form>

          <div className="mt-5 text-center">
            <p className="text-sm text-charcoal-gray">
              Already have an account?{" "}
              <Link to={"/signin"} className="text-azure-blue">
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
