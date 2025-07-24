'use client';
import Button from "@/components/ui/atoms/buttons/Button";
import SpinnerButton from "@/components/ui/atoms/buttons/SpinnerButton";
import NextImage from "@/components/ui/atoms/common/NextImage";

import Label from "@/components/ui/atoms/form/Label";
import Subtitle from "@/components/ui/atoms/typography/Subtitle";
import Title from "@/components/ui/atoms/typography/Title";
import TextareaWithLabel from "@/components/ui/molecules/form/TextareaWithLabel";
import ModalWrapper from "@/components/ui/molecules/ModalWrapper";
import { reviewSchema, type ReviewFormData } from "@/schemas/review.schema";
import { apiRequest } from "@/utils/api";
import { notifyError, notifySuccess } from "@/utils/toast";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { CgClose } from "react-icons/cg";

interface Props {
  id: string;
  title: string;
  image: string;
}

const intialState = {
  rating: 1,
  comment: "",
};

const ReviewModal = ({ id, title, image }: Props) => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: intialState,
  });

  const formData = watch();

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onSubmit = async (data: ReviewFormData) => {
    setIsLoading(true);

    const result = await apiRequest({
      endpoint: `product/add-review/${id}`,
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
    toggleModal();
  };

  return (
    <>
      <Button onClick={toggleModal} className="max-w-[200px]">
        Write review
      </Button>

      <ModalWrapper
        isOpen={isModalOpen}
        className="lg:max-w-[800px] px-5 lg:max-h-[700px]"
      >
        <div className="flex lg:justify-center items-center flex-col h-full overflow-y-auto py-5 lg:pt-0 gap-6 relative">
          <span
            onClick={toggleModal}
            className="absolute top-1 lg:top-8 cursor-pointer right-2 lg:right-7"
          >
            <CgClose size={26} />
          </span>
          <Subtitle>Give a Review</Subtitle>

          <div className="flex items-center gap-3 my-5 mr-auto">
            <div className="size-[60px] md:size-[100px]">
             <NextImage src={image} />
            </div>
            <Title>{title}</Title>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[90%] space-y-5 "
          >
            <div>
              <Label label="Give a rating" required name="rating" />
              <div className="flex items-center gap-3">
                {Array.from({ length: 5 }).map((_, i: number) => {
                  const rating = formData.rating;
                  if (rating > i) {
                    return (
                      <AiFillStar
                        onClick={() => setValue("rating", i + 1)}
                        size={33}
                        color="#efe909"
                        className="cursor-pointer"
                      />
                    );
                  } else {
                    return (
                      <AiOutlineStar
                        onClick={() => setValue("rating", i + 1)}
                        size={33}
                        color="#efe909"
                        className="cursor-pointer"
                      />
                    );
                  }
                })}
              </div>
            </div>

            <div className="w-full">
              <TextareaWithLabel
                error={errors?.comment}
                label="Comment"
                name="comment"
                register={register}
                className="w-full"
                required
              />
            </div>

            <DevTool control={control} />

            <SpinnerButton
              className="mt-2 mx-auto col-span-full"
              isLoading={isLoading}
            >
              Add
            </SpinnerButton>
          </form>
        </div>
      </ModalWrapper>
    </>
  );
};

export default ReviewModal;
