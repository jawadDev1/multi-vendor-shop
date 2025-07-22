"use client";
import Label from "@/components/ui/atoms/form/Label";
import InputWithLabel from "@/components/ui/molecules/form/InputWithLabel";
import SelectWithLabel from "@/components/ui/molecules/form/SelectWithLabel";
import type { ShippingFormData } from "@/schemas/shipping.schema";
import type { IAddress } from "@/types/api";
import React, { useEffect, useMemo, useState } from "react";
import type {
  FieldErrors,
  SubmitHandler,
  UseFormRegister,
  UseFormReset,
} from "react-hook-form";
import { Country, City } from "country-state-city";
import Button from "@/components/ui/atoms/buttons/Button";
import { useUserStore } from "@/stores/user-store";

interface ShippingFormProps {
  register: UseFormRegister<ShippingFormData>;
  handleSubmit: (
    onValid: SubmitHandler<ShippingFormData>
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  onSubmit: SubmitHandler<ShippingFormData>;
  errors: FieldErrors<ShippingFormData>;
  reset: UseFormReset<ShippingFormData>;
  formData: ShippingFormData;
}

const ShippingForm = ({
  errors,
  handleSubmit,
  onSubmit,
  register,
  reset,
  formData,
}: ShippingFormProps) => {
  const {user} = useUserStore();
  const [citiesOptions, setCititesOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const handleSavedAddress = (type: string) => {
    const address = addresses.find((addr) => addr.address_type === type);
    if (!address) return;
    reset({
      ...address,
      contact: user?.contact!,
      name: user?.name!,
      email: user?.email!,
    });
  };

  const addresses: IAddress[] =
    user?.addresses && user?.addresses.length > 0 ? user?.addresses : [];
  const address_types =
    addresses &&
    addresses.map((addr) => ({
      label: addr.address_type,
      value: addr.address_type,
    }));

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

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-md shadow-xl px-4 py-4 md:py-7 bg-white"
      onSubmit={handleSubmit(onSubmit)}
    >
      {addresses && addresses.length > 0 && (
        <div className="col-span-full">
          <Label name="address_type" label="Chose From saved address" />
          <select
            onChange={(e) => handleSavedAddress(e.target.value)}
            className={`w-full mt-1 h-[44px] bg-white text-charcoal lg:h-[45px] px-2 py-2 border border-gray-border rounded-md focus:border-blue-500 focus:outline-0`}
          >
            <option value={""}>select</option>
            {address_types &&
              address_types.length > 0 &&
              address_types.map(({ label, value }, i) => (
                <option key={`${value}-${i}`} value={value}>
                  {label}
                </option>
              ))}
          </select>
        </div>
      )}

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
          placeholder="naruto@gmail.com"
          label="Email"
          name="email"
          register={register}
          error={errors?.email}
          required
        />
      </div>

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
          disabled={!formData.country}
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
        <InputWithLabel
          type="number"
          placeholder="+923045829832"
          label="Contact"
          name="contact"
          register={register}
          error={errors?.contact}
          required
        />
      </div>

      <div className="col-span-full flex justify-center">
        <Button className="  mx-auto  max-w-[400px]">Proceed to Payment</Button>
      </div>
    </form>
  );
};

export default ShippingForm;
