import cn from "@/utils/cn";
import React from "react";

type ImageProps = {
  className?: string;
  src: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

const Image = ({ className, src, ...props }: ImageProps) => {
  return (
    <img
      src={src}
      className={cn("w-full h-full object-fill", className)}
      {...props}
    />
  );
};

export default Image;
