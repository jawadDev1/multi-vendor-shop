"use client";
import { useState } from "react";
import PageWrapper from "../../atoms/PageWrapper";
import Subheading from "../../atoms/typography/Subheading";
import { useForm } from "react-hook-form";
import { shopSchema, type ShopSchemaData } from "@/schemas/shop.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/utils/api";
import { notifyError } from "@/utils/toast";
import InputWithLabel from "../../molecules/form/InputWithLabel";
import Button from "../../atoms/buttons/Button";
import Spinner from "../../atoms/extra/Spinner";

import FileInputWithPreview from "../../molecules/form/FileInputWithPreview";
import { uploadImageToAppwrite } from "@/utils/uploadFile";
import TextareaWithLabel from "../../molecules/form/TextareaWithLabel";
import { useRouter } from "next/navigation";
import ShopRequestModal from "../../organisms/Modals/ShopRequestModal";

const RegisterSellerPageTemplate = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ShopSchemaData>({
    resolver: zodResolver(shopSchema),
  });

  const onSubmit = async (data: ShopSchemaData) => {
    setIsLoading(true);
    const file = data.logo;
    setIsLoading(true);

    const url = await uploadImageToAppwrite(file);

    const result = await apiRequest({
      endpoint: `shop/register`,
      body: {
        ...data,
        logo: url,
      },
    });

    if (!result?.success) {
      notifyError(result?.message);

      setIsLoading(false);
      return;
    }

    setIsModalOpen(true);
    setIsLoading(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    router.push("/");
  };

  return (
    <>
      <ShopRequestModal handleModal={handleModalClose} isOpen={isModalOpen} />
      <PageWrapper className="px-5">
        <Subheading className="text-center">Register as a Seller</Subheading>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" grid grid-cols-1  lg:grid-cols-2 gap-6  mt-7 lg:mt-10"
        >
          <div>
            <InputWithLabel
              type="text"
              placeholder="Galaxy shop"
              label="Shop Name"
              name="shop_name"
              register={register}
              error={errors?.shop_name}
              required
            />
          </div>

          <div>
            <InputWithLabel
              type="number"
              placeholder="923781232422"
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
              placeholder="5432"
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
              placeholder="Hidden leaf village Fire Nation"
              label="Address"
              name="address"
              register={register}
              error={errors?.address}
              required
            />
          </div>

          <div className="col-span-full">
            <TextareaWithLabel
              placeholder="Write about your shop"
              label="About"
              name="about"
              register={register}
              error={errors?.about}
              required
            />
          </div>

          <div className="">
            <FileInputWithPreview
              name="logo"
              error={errors?.logo}
              register={register}
              setValue={setValue}
              label="Shop Logo"
              required
              id="logo"
              accept=".jpg,.jpeg,.png"
            />
          </div>

          {/* <DevTool control={control} /> */}

          <Button className="col-span-full max-w-[200px] ml-auto ">
            {isLoading ? <Spinner className="border-white" /> : "Register"}
          </Button>
        </form>
      </PageWrapper>
    </>
  );
};

export default RegisterSellerPageTemplate;
