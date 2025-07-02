import Button from "@/components/ui/atoms/buttons/Button";
import Spinner from "@/components/ui/atoms/extra/Spinner";
import InputWithLabel from "@/components/ui/molecules/form/InputWithLabel";
import SelectWithLabel from "@/components/ui/molecules/form/SelectWithLabel";
import { eventSchema, type EventFormData } from "@/schemas/event.schema";

import { apiRequest } from "@/utils/api";
import { notifyError, notifySuccess } from "@/utils/toast";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";

interface Props {
  products: { label: string; value: string }[];
  defaultValues?: { [key: string]: unknown };
  id?: string;
}

const initialState = {
  discount: 0,
};

const EventForm = ({ products, defaultValues = initialState, id }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues,
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<EventFormData> = async (data) => {
    console.log("data ======> ", data);

    setIsLoading(true);
    try {
      const route = id ? `event/update/${id}` : `event/create-event`;
      const method = id ? "PUT" : "POST";
      const result = await apiRequest({
        endpoint: route,
        body: {
          ...data,
          start_date: data?.start_date.toISOString(),
          end_date: data?.end_date.toISOString(),
        },
        method,
      });

      if (!result?.success) {
        notifyError(result?.message);
        setIsLoading(false);
        return;
      }

      notifySuccess(result?.message);
      setIsLoading(false);

      navigate("/seller/events");
      window.location.reload();
    } catch (err) {
      setIsLoading(false);
      console.error("Create event failed:", err);
    }
  };

  return (
    <>
      <div className="bg-card-bg py-5 lg:py-7 px-4 rounded-lg  shadow mt-7 w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" grid grid-cols-1 md:grid-cols-2 gap-5 "
        >
          <div className="col-span-full">
            <SelectWithLabel
              label="Product"
              name="product"
              register={register}
              options={products}
              error={errors?.product}
            />
          </div>

          <div>
            <InputWithLabel
              type="datetime-local"
              label="Start Date"
              name="start_date"
              register={register}
              error={errors?.start_date}
              required
            />
          </div>

          <div>
            <InputWithLabel
              type="datetime-local"
              label="End Date"
              name="end_date"
              register={register}
              error={errors?.end_date}
              required
            />
          </div>

          <DevTool control={control} />

          <Button className="col-span-full">
            {isLoading ? (
              <Spinner className="border-white" />
            ) : id ? (
              "Update"
            ) : (
              "Create"
            )}
          </Button>
        </form>
      </div>
    </>
  );
};

export default EventForm;
