import cn from "@/utils/cn";
import Image from "next/image";
import React from "react";

type ImageProps = {
  className?: string;
  src: string;
  width?: number;
  height?: number;
} & React.ImgHTMLAttributes<HTMLImageElement>;

const NextImage = ({
  className,
  src,
  width = 500,
  height = 500,
  ...props
}: ImageProps) => {
  return (
    src && (
      <Image
        src={src}
        width={width}
        height={height}
        className={cn("w-full h-full object-fill", className)}
        alt={"Image"}
        {...props}
      />
    )
  );
};

export default NextImage;
