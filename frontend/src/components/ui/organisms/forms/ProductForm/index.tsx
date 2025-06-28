import Button from "@/components/ui/atoms/buttons/Button";
import Spinner from "@/components/ui/atoms/extra/Spinner";
import InputWithLabel from "@/components/ui/molecules/form/InputWithLabel";
import MultiFileInputWithPreview from "@/components/ui/molecules/form/MultiFileInputWithPreview";
import SelectWithLabel from "@/components/ui/molecules/form/SelectWithLabel";
import TagsInputWithLabel from "@/components/ui/molecules/form/TagsInputWithLabel";
import TextareaWithLabel from "@/components/ui/molecules/form/TextareaWithLabel";
import { productSchema, type ProductFormData } from "@/schemas/product.schema";

import { apiRequest } from "@/utils/api";
import { notifyError, notifySuccess } from "@/utils/toast";
import { uploadImageToAppwrite } from "@/utils/uploadFile";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { FieldError } from "react-hook-form";
import { useNavigate } from "react-router";

interface Props {
  categories: { label: string; value: string }[];
  defaultValues?: { [key: string]: unknown };
  slug?: string;
  tags?: string[];
  images?: string[];
}

const initialState = {
  discount: 0,
};

const ProductForm = ({
  categories,
  defaultValues = initialState,
  slug,
  tags = [],
  images = [],
}: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [defaultImages, setDefaultImages] = useState<string[]>(images);
  const [productImages, setProductImages] = useState<File[]>([]);
  const [productImagesError, setProductImagesError] = useState<string>("");

  const handleImages = (img: File) => {
    setProductImages((prev) => [...prev, img]);
  };

  // handle image remove. In update shouldRemoveFromDefault to check whether remove from new or previous images.
  const handleRemoveImages = (
    index: number,
    shouldRemoveFromDefault: boolean = false
  ) => {
    if (shouldRemoveFromDefault) {
      setDefaultImages((prev) => prev.filter((_, i) => i !== index));
      return;
    }
    index = index - defaultImages.length;
    setProductImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
    if (productImages.length == 0 && defaultImages.length == 0)
      return setProductImagesError("images are reuired");

    setIsLoading(true);
    try {
      let images: string[] = [];
      if (productImages.length > 0) {
        // Upload images to appwrite
        images = await Promise.all(
          productImages.map((img) => uploadImageToAppwrite(img))
        );

        if (!images) {
          notifyError("Image upload failed");
          return;
        }
      }

      const body = slug
        ? {
            ...data,
            images: [...defaultImages, ...images],
          }
        : {
            ...data,
            images,
          };
      const route = slug ? `product/update/${slug}` : `product/create-product`;

      const result = await apiRequest({
        endpoint: route,
        body: body,
        method: slug ? "PUT" : "POST",
      });

      if (!result?.success) {
        notifyError(result?.message);
        setIsLoading(false);
        return;
      }

      notifySuccess(result?.message);
      setIsLoading(false);

      navigate("/seller/products");
      window.location.reload();
    } catch (err) {
      setIsLoading(false);
      console.error("Create product failed:", err);
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
              placeholder="PlayStation 5"
              label="Title"
              name="title"
              register={register}
              error={errors?.title}
              required
            />
          </div>

          <div className="col-span-full">
            <TextareaWithLabel
              placeholder="Product descriptions"
              label="Description"
              name="description"
              register={register}
              error={errors?.description}
              required
            />
          </div>

          <div>
            <InputWithLabel
              type="number"
              placeholder="400"
              label="Price"
              name="originalPrice"
              register={register}
              error={errors?.originalPrice}
              required
            />
          </div>

          <div>
            <InputWithLabel
              type="number"
              placeholder="0"
              label="Discount (in percentage)"
              name="discount"
              min={0}
              minLength={0}
              onChange={(e) => {
                if (e.target.value == "") {
                  e.preventDefault();
                  setValue("discount", 0);
                  return;
                }
              }}
              register={register}
              error={errors?.discount}
            />
          </div>

          <div>
            <InputWithLabel
              type="number"
              placeholder="5"
              label="Stock"
              name="stock"
              register={register}
              error={errors?.stock}
            />
          </div>

          <div>
            <SelectWithLabel
              label="Category"
              name="category"
              register={register}
              options={categories}
              error={errors?.category}
            />
          </div>

          <div>
            <TagsInputWithLabel
              label="Tags"
              name="tags"
              setValue={setValue}
              error={errors?.tags as FieldError}
              defaultTags={tags}
            />
          </div>

          <DevTool control={control} />

          <div className="col-span-full">
            <MultiFileInputWithPreview
              label="Images"
              id="images"
              name="images"
              accept=".jpg,.jpeg,.png"
              error={productImagesError}
              handleImages={handleImages}
              required
              defaultImages={images}
              handleRemoveImages={handleRemoveImages}
            />
          </div>

          <Button className="col-span-full">
            {isLoading ? (
              <Spinner className="border-white" />
            ) : slug ? (
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

export default ProductForm;
