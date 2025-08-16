import { formatMessageTime } from "@/utils";
import cn from "@/utils/cn";
import React from "react";
import NextImage from "../../common/NextImage";

interface MessageItemProps {
  isSender: boolean;
  text: string;
  date: string;
  type?: string;
  images?: string[];
}

const MessageItem = ({
  isSender,
  text,
  date,
  type = "TEXT",
  images = [],
}: MessageItemProps) => {
  if(type === "IMAGE") {
    console.log("msg ======+> ", text)
  }
  return (
    <div
      className={cn("rounded pb-1.5 px-2 text-white bg-gray-400  max-w-fit", {
        "bg-green-500 ml-auto": isSender,
      })}
    >
      {type === "IMAGE" && images?.length > 0 ? (
        <div className="max-w-[30vw] max-h-[50vh] overflow-hidden">
          <NextImage src={images[0]} className="object-cover" />
        </div>
      ) : (
        <>
          <span className="text-xs text-end w-full inline-block">
            {formatMessageTime(date)}
          </span>
          <p>{text}</p>
        </>
      )}
    </div>
  );
};

export default MessageItem;
