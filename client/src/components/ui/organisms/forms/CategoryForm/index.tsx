"use client";
import Button from "@/components/ui/atoms/buttons/Button";
import Spinner from "@/components/ui/atoms/extra/Spinner";
import ImageInputWithPreview from "@/components/ui/molecules/form/ImageInputWithPreview";
import InputWithLabel from "@/components/ui/molecules/form/InputWithLabel";
import TextareaWithLabel from "@/components/ui/molecules/form/TextareaWithLabel";
import { CategoryFormData, categorySchema } from "@/schemas/category.schema";

import { apiRequest } from "@/utils/api";
import { notifyError, notifySuccess } from "@/utils/toast";
import { uploadImageToAppwrite } from "@/utils/uploadFile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {  useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

interface Props {
  defaultValues?: {title: string, description: string};
  id?: string;
  image?: string;
}

const CategoryForm = ({
  defaultValues ,
  id,
  image = "",
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues,
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const defaultImage = image
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [categoryImagesError, setCategoryImagesError] = useState<string>("");

  const handleImageChange = (file: File) => {
    if (!file) return;
    setCategoryImage(file);
  };

  const onSubmit: SubmitHandler<CategoryFormData> = async (data) => {
    if (!categoryImage && !defaultImage)
      return setCategoryImagesError("image is required");

    setIsLoading(true);
    try {
      let image: string = defaultImage;
      if (categoryImage) {
        image = await uploadImageToAppwrite(categoryImage);

        if (!image) {
          notifyError("Image upload failed");
          return;
        }
      }

      const body = {
        ...data,
        image,
      };
      const route = id ? `category/update/${id}` : `category/create`;

      const result = await apiRequest({
        endpoint: route,
        body: body,
        method: id ? "PUT" : "POST",
      });

      if (!result?.success) {
        notifyError(result?.message);
        setIsLoading(false);
        return;
      }

      notifySuccess(result?.message);
      setIsLoading(false);

      router.push("/hokage/categories");
      router.refresh();
    } catch (err) {
      setIsLoading(false);
      console.error("Create category failed:", err);
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
            <InputWithLabel
              type="text"
              placeholder="Gaming"
              label="Title"
              name="title"
              register={register}
              error={errors?.title}
              required
            />
          </div>

          <div className="col-span-full">
            <TextareaWithLabel
              placeholder="Category descriptions"
              label="Description"
              name="description"
              register={register}
              error={errors?.description}
              required
            />
          </div>

          <div className="col-span-full flex items-center gap-3">
            <ImageInputWithPreview
              id="image"
              name="image"
              accept=".jpg,.jpeg,.png"
              defaultPreview={defaultImage}
              required
              handleImageChange={handleImageChange}
              error={categoryImagesError}
            />
          </div>

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

export default CategoryForm;
