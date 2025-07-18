'use client';
import SpinnerButton from "@/components/ui/atoms/buttons/SpinnerButton";
import Checkbox from "@/components/ui/atoms/form/Checkbox";
import Label from "@/components/ui/atoms/form/Label";
import Subtitle from "@/components/ui/atoms/typography/Subtitle";
import InputWithLabel from "@/components/ui/molecules/form/InputWithLabel";
import MultiSelectWithLabel from "@/components/ui/molecules/form/MultiSelectWithLabel";
import ModalWrapper from "@/components/ui/molecules/ModalWrapper";
import useGetData from "@/hooks/useGetData";
import { coupounSchema, type CoupounFormData } from "@/schemas/coupoun.schema";
import { useShopStore } from "@/stores/shop-store";
import type { ISelectOptions } from "@/types/common";
import { apiRequest } from "@/utils/api";
import cn from "@/utils/cn";
import { notifyError, notifySuccess } from "@/utils/toast";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CgClose } from "react-icons/cg";

interface Props {
  isOpen: boolean;
  handleModal: () => void;
  defaultValues?: CoupounFormData;
  id?: string | null;
}

const intialState = {
  min_amount: 0,
  max_amount: 0,
  limit: 1,
  name: "",
  value: 0,
  type: "",
  shop: "",
};

const CoupounModal = ({
  isOpen,
  handleModal,
  defaultValues = intialState,
  id,
}: Props) => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CoupounFormData>({
    resolver: zodResolver(coupounSchema),
  });

  const formData = watch();

  const { data: options } = useGetData({
    endpoint: "product/get-form-products",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { shop } = useShopStore(); 

  const onSubmit = async (data: CoupounFormData) => {
    setIsLoading(true);

    const route = id ? `coupoun/update/${id}` : "coupoun/create-coupoun";
    const method = id ? "PUT" : "POST";

    const result = await apiRequest({
      endpoint: route,
      body: data,
      method,
    });
    setIsLoading(false);

    if (!result.success) {
      notifyError(result?.message);
      return;
    }

    notifySuccess(result?.message);
    handleModal();
    
  };

  useEffect(() => {
    setValue("shop", shop?._id!);
   
    reset(defaultValues);

    return () => {
      reset();
    };
  }, [shop?._id]);

  return (
    <ModalWrapper
      isOpen={isOpen}
      className="lg:max-w-[800px] px-5 lg:max-h-[700px]"
    >
      <div className="flex lg:justify-center items-center flex-col h-full overflow-y-auto py-5 lg:pt-0 gap-6 relative">
        <span
          onClick={handleModal}
          className="absolute top-1 lg:top-8 cursor-pointer right-2 lg:right-7"
        >
          <CgClose size={26} />
        </span>
        <Subtitle>Create Coupoun</Subtitle>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" grid grid-cols-1 md:grid-cols-2 gap-5 "
        >
          <div>
            <InputWithLabel
              type="text"
              placeholder="BY2020"
              label="Name"
              name="name"
              register={register}
              error={errors?.name}
              required
            />
          </div>

          <div>
            <InputWithLabel
              type="number"
              placeholder="5"
              label="Discount (in percentage)"
              name="value"
              onChange={(e) => {
                if (e.target.value == "") {
                  e.preventDefault();
                  setValue("value", 0);
                  return;
                }
              }}
              register={register}
              error={errors?.value}
              required
            />
          </div>

          <div>
            <InputWithLabel
              type="number"
              placeholder="0"
              label="Min amount"
              name="min_amount"
              register={register}
              error={errors?.min_amount}
              onChange={(e) => {
                if (e.target.value == "") {
                  e.preventDefault();
                  setValue("min_amount", 0);
                  return;
                }
              }}
            />
          </div>

          <div>
            <InputWithLabel
              type="number"
              placeholder="0"
              label="Max amount"
              name="max_amount"
              onChange={(e) => {
                if (e.target.value == "") {
                  e.preventDefault();
                  setValue("max_amount", 0);
                  return;
                }
              }}
              register={register}
              error={errors?.max_amount}
            />
          </div>

          <div>
            <InputWithLabel
              type="number"
              placeholder="100"
              label="Limit"
              name="limit"
              register={register}
              error={errors?.limit}
              onChange={(e) => {
                if (e.target.value == "") {
                  e.preventDefault();
                  setValue("limit", 0);
                  return;
                }
              }}
            />
          </div>

          <div className="col-span-full ">
            <Label label="Products" name="type" />
            <div className="flex items-center gap-5 mt-1 ">
              <Checkbox
                label="Limited"
                name="type"
                value={"LIMITED"}
                register={register}
              />

              <Checkbox
                label="All"
                name="type"
                value={"ALL"}
                register={register}
              />
            </div>
            {errors?.type && (
              <p className="text-tomato-red text-sm mt-1" role="alert">
                {errors?.type?.message}
              </p>
            )}
          </div>

          <div
            className={cn("col-span-full hidden", {
              block: formData.type === "LIMITED",
            })}
          >
            <MultiSelectWithLabel
              label="Products"
              name="products"
              setValue={setValue}
              options={options as unknown as ISelectOptions[]}
              error={errors?.products?.[0]}
              defaultOptions={formData?.products ?? []}
            />
          </div>

          <DevTool control={control} />

          <SpinnerButton
            className="mt-2 mx-auto col-span-full"
            isLoading={isLoading}
          >
            {id ? "Update" : "Create"}
          </SpinnerButton>
        </form>
      </div>
    </ModalWrapper>
  );
};

export default CoupounModal;
