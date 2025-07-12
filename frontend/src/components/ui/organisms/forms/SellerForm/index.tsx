import InputWithLabel from "@/components/ui/molecules/form/InputWithLabel";
import { useForm } from "react-hook-form";
import {
  shopUpdateSchema,
  type ShopUpdateSchemaData,
} from "@/schemas/shop.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { apiRequest } from "@/utils/api";
import { notifyError, notifySuccess } from "@/utils/toast";
import TextareaWithLabel from "@/components/ui/molecules/form/TextareaWithLabel";
import SpinnerButton from "@/components/ui/atoms/buttons/SpinnerButton";
import { useState } from "react";
import { uploadImageToAppwrite } from "@/utils/uploadFile";
import { AiOutlineEdit } from "react-icons/ai";
import Image from "@/components/ui/atoms/common/Image";
import { useAppDispatch } from "@/app/hooks";
import { updateShop } from "@/features/shop/shopSlice";

const initialState: ShopUpdateSchemaData = {
  about: "",
  address: "",
  contact: 0,
  shop_name: "",
  zip_code: 0,
};

interface SellerFormProps {
  defaultValues?: ShopUpdateSchemaData;
  logo: string;
  id: string;
}

const SellerUpdateForm = ({
  defaultValues = initialState,
  logo,
  id,
}: SellerFormProps) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string>(logo);
  const [newProfile, setNewProfile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShopUpdateSchemaData>({
    resolver: zodResolver(shopUpdateSchema),
    defaultValues,
  });

  const onSubmit = async (data: ShopUpdateSchemaData) => {
    setIsLoading(true);

    let payload: {
      shop_name: string;
      zip_code: number;
      contact: number;
      about: string;
      address: string;
      logo?: string;
    } = { ...data, logo };

    if (newProfile) {
      const url = await uploadImageToAppwrite(newProfile);
      payload["logo"] = url;
    }

    const result = await apiRequest({
      endpoint: `shop/update-settings/${id}`,
      body: payload,
      method: "PUT",
    });

    if (!result?.success) {
      notifyError(result?.message);
      setIsLoading(false);
      return;
    }

    notifySuccess(result?.message);
    dispatch(updateShop(result?.data));
    setIsLoading(false);
    // window.location.reload();
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" grid grid-cols-1  lg:grid-cols-2 gap-6  mt-7 lg:mt-10"
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

        <Image src={preview} className="rounded-full overflow-hidden" />
        <span className="absolute bg-gray-100 rounded-full right-0 bottom-0 z-10">
          <AiOutlineEdit size={28} />
        </span>
      </label>

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

      <div>
        <TextareaWithLabel
          placeholder="Write about your shop"
          label="About"
          name="about"
          register={register}
          error={errors?.about}
          required
        />
      </div>

      {/* <div className="flex items-center gap-x-5">
        <FileInputWithPreview
          name="logo"
          error={errors?.logo}
          register={register}
          setValue={setValue}
          required
          id="logo"
          accept=".jpg,.jpeg,.png"
        />
      </div> */}

      {/* <DevTool control={control} /> */}

      <SpinnerButton
        isLoading={isLoading}
        className="col-span-full max-w-[200px] ml-auto "
      >
        Update
      </SpinnerButton>
    </form>
  );
};

export default SellerUpdateForm;
