import cn from "@/utils/cn";
import Image from "../../atoms/common/Image";
import CardTitle from "../../atoms/typography/CardTitle";
import { AiOutlineSend } from "react-icons/ai";
import { GrGallery } from "react-icons/gr";
import useSocket from "@/hooks/useSocket";
import { useEffect, useState, type FormEvent } from "react";
import { useAppSelector } from "@/app/hooks";
import type {
  IAPISellerConversations,
  IAPIUserConversations,
} from "@/types/api";
import { BiChevronLeft } from "react-icons/bi";

interface ChatBoxProps {
  chat: {
    last_message: string | null;
    user?: {
      _id: string;
      name: string;
      email: string;
      profile: string;
    };
    seller?: {
      _id: string;
      name: string;
      email: string;
      profile: string;
    };
    group_title: string;
  };
  handleChatClose: () => void;
}

interface Message {
  _id: string;
  conversation_id: string;
  sender: string;
  text?: string;
  images?: string[];
  createdAt: string;
}

const ChatBox = ({ chat, handleChatClose }: ChatBoxProps) => {
  const { isConnected, socket } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>("");

  const { user } = useAppSelector((state) => state.user);
  const { group_title: conversationId } = chat;
  const chatUser = chat?.user ? chat.user : chat.seller;

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();

    if (!socket || !text.trim()) return;

    const payload = {
      conversation_id: chat.group_title,
      sender_id: user?._id!,
      text,
    };

    socket.emit("send_message", payload);

    setText("");
  };

  useEffect(() => {
    if (!socket || !conversationId) return;

    socket.emit("join", conversationId);

    socket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [conversationId, isConnected]);

  if (!chatUser) return;

  return (
    <div className="flex flex-col justify-between max-h-full h-full">
      <div
        className={cn(
          "flex gap-x-2 items-center bg-transparent px-5 py-2 cursor-pointer bg-blue-50 "
        )}
      >
        <div onClick={handleChatClose}>
          <BiChevronLeft size={33} />
        </div>

        <div className="relative">
          <div className="size-16 rounded-full overflow-hidden ">
            <Image src={chatUser.profile} className="object-cover" />
          </div>
          <div className="size-3 bg-primary-green rounded-full  absolute right-1 bottom-1" />
        </div>
        <div className="space-y-1">
          <CardTitle>{chatUser.name}</CardTitle>
        </div>
      </div>

      <div className="px-3 py-4 flex-1 flex flex-col gap-y-3 justify-end overflow-y-auto max-h-full">
        {messages &&
          messages.length > 0 &&
          messages.map((msg) => (
            <div key={msg._id}>
              {msg.sender == user?._id ? (
                <div className="rounded py-2 px-2 text-white bg-primary-green ml-auto max-w-fit">
                  {msg.text}
                </div>
              ) : (
                <div className="rounded py-2 px-2 text-white bg-gray-400 max-w-fit">
                  {msg.text}
                </div>
              )}
              {msg?.images?.map((img: string, idx: number) => (
                <img key={idx} src={img} alt="sent" width="200" />
              ))}
            </div>
          ))}
      </div>

      <form
        onSubmit={sendMessage}
        className="px-3 pb-2 flex gap-x-3 items-center"
      >
        <label htmlFor="image" className="cursor-pointer">
          <GrGallery size={22} />
          <input type="file" name="image" id="image" className="hidden" />
        </label>
        <div className="border border-dim-gray rounded-md  w-full focus:border-blue-500 relative h-fit ">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            className={cn(
              `w-full mt-1 h-full placeholder:text-light-gray text-primary  px-2 py-2  rounded-md  focus:outline-0`
            )}
            required
            placeholder="message"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2">
            <AiOutlineSend size={23} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
