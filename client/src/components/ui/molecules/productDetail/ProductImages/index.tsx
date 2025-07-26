import NextImage from "@/components/ui/atoms/common/NextImage";
import cn from "@/utils/cn";
import React, { useState } from "react";

const ProductImages = ({ images }: { images: string[] }) => {
  const [slectedImage, setSlectedImage] = useState<number>(0);
  const handleImageChange = (index: number) => {
    setSlectedImage(index);
  };
  return (
    <div
      className={cn("flex flex-col justify items-start  gap-5 overflow-hidden", {
        "mmd:grid-cols-[20%,3%,77%]": images?.length > 1,
      })}
    >
      <div className="w-full  rounded-xl overflow-hidden  h-[300px] md:h-[400px] max-h-fit ">
        <NextImage
          src={images[slectedImage]}
          className="object-contain object-center"
        />
      </div>
      <div className="">
        {images && images.length > 1 && (
          <div className="flex gap-3 items-center overflow-x-auto max-w-full ">
            {images.map(
              (src, i) =>
                i !== slectedImage && (
                  <div
                    key={i}
                    onClick={() => handleImageChange(i)}
                    className="w-fit h-full shrink-0 rounded-md overflow-hidden max-h-[200px] lg:h-[180px] cursor-pointer "
                  >
                    <NextImage src={src} className="object-contain" />
                  </div>
                )
            )}
          </div>
        )}
      </div>
      {/* <div className="hidden md:block order-2 bg-transparent" /> */}
    </div>
  );
};

export default ProductImages;
