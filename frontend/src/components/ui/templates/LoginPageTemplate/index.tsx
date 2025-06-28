import React, { useState } from "react";
import SectionTitle from "../../atoms/typography/SectionTitle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type LoginFormData,
  loginSchema,
} from "../../../../schemas/login.schema";
import InputWithLabel from "../../molecules/form/InputWithLabel";
import Button from "../../atoms/buttons/Button";
import { Link, useNavigate } from "react-router";
import { apiRequest } from "@/utils/api";
import { notifyError, notifySuccess } from "@/utils/toast";
import ActivateAccountModal from "../../organisms/Modals/ActivateAccoutModal";
import Spinner from "../../atoms/extra/Spinner";

const LoginPageTemplate: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpem] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    const result = await apiRequest({ endpoint: "user/login", body: data });
    setIsLoading(false);
    if (!result.success) {
      notifyError(result?.message);
      return;
    }

    if (!result.verified) {
      setIsModalOpem(true);
      return;
    }

    notifySuccess(result?.message);

    navigate("/");

    window.location.reload();
  };

  return (
    <>
      <ActivateAccountModal
        isOpen={isModalOpen}
        handleModal={() => setIsModalOpem(false)}
      />
      <div className="max-w-[600px] mx-auto w-full px-5 lg:px-0">
        <SectionTitle className="text-center">Login</SectionTitle>

        <div className="bg-card-bg py-5 lg:py-7 px-4 rounded-lg border border-light-gray shadow mt-7 w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" space-y-5 lg:space-y-6 "
          >
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
                placeholder="********"
                label="Password"
                name="password"
                error={errors?.password}
                register={register}
                required
              />
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center justify-start gap-x-2 flex-row-reverse shrink-0">
                <InputWithLabel
                  type="checkbox"
                  className="w-4 h-4 mt-0"
                  label="Remember me"
                  name="remember"
                  id="remember"
                  error={errors?.remember}
                  register={register}
                />
              </div>
              <Link
                to={"/forgot-password"}
                className="text-azure-blue text-end w-full block underline text-sm"
              >
                forgot password?
              </Link>
            </div>

            <Button>
              {isLoading ? <Spinner className="border-white" /> : "Login"}
            </Button>
          </form>

          <div className="mt-5 text-center">
            <p className="text-sm text-charcoal-gray">
              Don't have an account?{" "}
              <Link to={"/signup"} className="text-azure-blue">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPageTemplate;
