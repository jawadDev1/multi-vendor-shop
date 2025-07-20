import NextImage from "@/components/ui/atoms/common/NextImage";
import cn from "@/utils/cn";
import React, { useState } from "react";

const ProductImages = ({ images }: { images: string[] }) => {
  const [slectedImage, setSlectedImage] = useState<number>(0);
  const handleImageChange = (index: number) => {
    setSlectedImage(index);
  };
  return (
    <div className={cn("grid grid-cols-1   md:justify-between overflow-hidden", {"md:grid-cols-[20%,3%,77%]": images?.length > 1})}>
      <div className="order-3 md:order-1">
        {images && images.length > 1 && (
          <div className="flex md:flex-col gap-3 ">
            {images.map(
              (src, i) =>
                i !== slectedImage && (
                  <div
                    key={i}
                    onClick={() => handleImageChange(i)}
                    className="w-full h-full shrink-0 rounded-md overflow-hidden max-h-[200px] lg:h-[180px] cursor-pointer "
                  >
                    <NextImage src={src} className="object-ccover" />
                  </div>
                )
            )}
          </div>
        )}
      </div>
      <div className="hidden md:block order-2 bg-transparent"></div>
      <div className="w-full rounded-xl order-3 md:order-1 overflow-hidden  h-[300px] md:h-[600px] ">
        <NextImage src={images[slectedImage]} className="object-ccover object-center" />
      </div>
    </div>
  );
};

export default ProductImages;
