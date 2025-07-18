import cn from "@/utils/cn";
import Image from "../../atoms/common/NextImage";
import CardTitle from "../../atoms/typography/CardTitle";
import { AiOutlineSend } from "react-icons/ai";
import { GrGallery } from "react-icons/gr";
import useSocket from "@/hooks/useSocket";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { getApiRequest } from "@/utils/api";
import { notifyError } from "@/utils/toast";
import MessageItem from "../../atoms/extra/MessageItem";

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
  const { user } = useAppSelector((state) => state.user);
  const { isConnected, socket } = useSocket({
    email: user?.email!,
    conversation_id: chat.group_title,
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>("");
  const [isUserOnline, setIsUserOnline] = useState<boolean>(false);

  const messageBoxRef = useRef<HTMLDivElement | null>(null);

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
    (async () => {
      const result = await getApiRequest(
        `message/get-messages/${conversationId}`
      );
      if (!result?.success) {
        notifyError(result?.message);
        return;
      }

      setMessages(result?.data);
    })();

    setTimeout(() => {
      if (messageBoxRef.current) {
        console.log("scroll");
        messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
      }
    }, 500);

    return () => {
      setMessages([]);
    };
  }, []);

  useEffect(() => {
    if (!socket || !conversationId) return;

    socket.emit("join", {
      conversation_id: conversationId,
      userId: user?.email!,
    });

    socket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
      setTimeout(() => {
        if (messageBoxRef.current) {
          messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
        }
      }, 100);
    });

    socket.on("online_users", (users: string[]) => {
      setIsUserOnline(users.includes(chatUser?.email!));
    });

    return () => {
      socket.off("receive_message");
      socket.off("online_users");
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
           <NextImage src={chatUser.profile} className="object-cover" />
          </div>
          <div
            className={cn(
              "size-3 bg-gray-400 rounded-full  absolute right-1 bottom-1",
              { "bg-primary-green": isUserOnline }
            )}
          />
        </div>
        <div className="space-y-1">
          <CardTitle>{chatUser.name}</CardTitle>
        </div>
      </div>

      <div
        ref={messageBoxRef}
        className="px-3 py-4 flex-1 flex flex-col gap-y-3 h-[30vh] overflow-y-auto max-h-full"
      >
        {messages &&
          messages.length > 0 &&
          messages.map((msg) => (
            <div key={msg._id}>
              <MessageItem
                text={msg?.text ?? ""}
                isSender={msg.sender == user?._id}
                date={msg.createdAt}
              />
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
