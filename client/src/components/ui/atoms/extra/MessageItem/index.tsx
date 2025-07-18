import { formatMessageTime } from "@/utils";
import cn from "@/utils/cn";
import React from "react";

interface MessageItemProps {
  isSender: boolean;
  text: string;
  date: string;
}

const MessageItem = ({ isSender, text, date }: MessageItemProps) => {
  return (
    <div
      className={cn("rounded pb-1.5 px-2 text-white bg-gray-400  max-w-fit", {
        "bg-primary-green ml-auto": isSender,
      })}
    >
      <span className="text-xs text-end w-full inline-block">
        {formatMessageTime(date)}
      </span>
      <p>{text}</p>
    </div>
  );
};

export default MessageItem;
