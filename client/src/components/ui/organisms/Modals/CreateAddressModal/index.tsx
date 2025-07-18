import SpinnerButton from "@/components/ui/atoms/buttons/SpinnerButton";
import Subtitle from "@/components/ui/atoms/typography/Subtitle";
import InputWithLabel from "@/components/ui/molecules/form/InputWithLabel";
import SelectWithLabel from "@/components/ui/molecules/form/SelectWithLabel";
import ModalWrapper from "@/components/ui/molecules/ModalWrapper";
import { addressSchema, type AddressFormData } from "@/schemas/address.schema";
import { apiRequest } from "@/utils/api";

import { notifyError, notifySuccess } from "@/utils/toast";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { CgClose } from "react-icons/cg";
import { Country, City } from "country-state-city";
import { useUserStore } from "@/stores/user-store";

interface Props {
  isOpen: boolean;
  handleModal: () => void;
  defaultValues?: AddressFormData;
  id?: string | null;
}

const intialState = {
  country: "",
  city: "",
  address1: "",
  address2: "",
  zip_code: 0,
  address_type: "",
};

const ADDRESS_TYPE_OPTIONS = [
  { label: "Default", value: "default" },
  { label: "Home", value: "home" },
  { label: "Office", value: "office" },
];

const CreateAddressModal = ({
  isOpen,
  handleModal,
  defaultValues = intialState,
  id,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [citiesOptions, setCititesOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const { updateUser } = useUserStore();

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues,
  });

  const formData = watch();

  const countriesOptions = useMemo(
    () =>
      Country.getAllCountries().map((country) => ({
        label: country.name,
        value: country.name,
      })),
    []
  );

  const getCitiesOptions = () => {
    const country = formData.country;

    if (!country) return;
    const countryCode = Country.getAllCountries().find(
      (coun) => coun.name == country
    )?.isoCode;

    const cityList = City.getCitiesOfCountry(countryCode!);
    if (!cityList) return;

    const options = cityList.map((val) => ({
      label: val.name,
      value: val.name,
    }));

    setCititesOptions(options);
  };

  useEffect(() => {
    getCitiesOptions();
  }, [formData.country]);

  const onSubmit = async (data: AddressFormData) => {
    setIsLoading(true);

    const route = id ? `user/update-address/${id}` : "user/create-address";
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

    updateUser(result.data);

    notifySuccess(result?.message);
    reset();
    handleModal();
  };

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
        <Subtitle>Create Address</Subtitle>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" grid grid-cols-1 md:grid-cols-2 gap-5 "
        >
          <div>
            <SelectWithLabel
              type="text"
              placeholder="Fire Nation"
              label="Country"
              name="country"
              register={register}
              options={countriesOptions}
              error={errors?.country}
              required
            />
          </div>

          <div>
            <SelectWithLabel
              type="text"
              placeholder="Leaf Village"
              label="City"
              name="city"
              register={register}
              options={citiesOptions}
              error={errors?.city}
              required
            />
          </div>

          <div>
            <InputWithLabel
              type="text"
              placeholder="Address 123"
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
              placeholder="Address 123"
              label="Address 2"
              name="address2"
              register={register}
              error={errors?.address2}
              required
            />
          </div>

          <div>
            <InputWithLabel
              type="number"
              placeholder="8493"
              label="Zip Code"
              name="zip_code"
              register={register}
              error={errors?.zip_code}
              required
            />
          </div>

          <div>
            <SelectWithLabel
              placeholder="Default"
              label="Address Type"
              name="address_type"
              register={register}
              options={ADDRESS_TYPE_OPTIONS}
              error={errors?.address_type}
              required
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

export default CreateAddressModal;
