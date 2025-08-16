import cn from "@/utils/cn";
import CardTitle from "../../atoms/typography/CardTitle";
import { AiOutlineSend } from "react-icons/ai";
import { GrGallery } from "react-icons/gr";
import useSocket from "@/hooks/useSocket";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { getApiRequest } from "@/utils/api";
import { notifyError } from "@/utils/toast";
import MessageItem from "../../atoms/extra/MessageItem";
import { useUserStore } from "@/stores/user-store";
import NextImage from "../../atoms/common/NextImage";
import { CgClose } from "react-icons/cg";
import { uploadImageToAppwrite } from "@/utils/uploadFile";
import SpinnerButton from "../../atoms/buttons/SpinnerButton";

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
  className?: string;
}

interface Message {
  _id: string;
  conversation_id: string;
  sender: string;
  text?: string;
  images?: string[];
  createdAt: string;
  type: string;
}

const ChatBox = ({ chat, handleChatClose, className }: ChatBoxProps) => {
  const { user } = useUserStore();
  const { isConnected, socket } = useSocket({
    email: user?.email!,
    conversation_id: chat.group_title,
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>("");
  const [isUserOnline, setIsUserOnline] = useState<boolean>(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  const [chatImage, setChatImage] = useState<{
    file: File;
    preview: string;
  } | null>(null);

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

  // Chat Image handlers
  const handleChatImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target?.files && e.target.files[0];
    if (!file) return;
    setIsPreviewOpen(true);
    setChatImage({ file: file, preview: URL.createObjectURL(file) });
  };

  const handlePreview = () => {
    setIsPreviewOpen(!isPreviewOpen);
    setChatImage(null);
  };

  const handleImageSend = async () => {
    if (!chatImage) return;
    setIsImageLoading(true);
    const imageUrl = await uploadImageToAppwrite(chatImage.file);
    if (!imageUrl) {
      notifyError("Something went wrong");
      setIsPreviewOpen(false);
      setIsImageLoading(false);
      return;
    }
    if (!socket) return;

    const payload = {
      conversation_id: chat.group_title,
      sender_id: user?._id!,
      type: "IMAGE",
      images: [imageUrl],
    };

    socket.emit("send_message", payload);
    setIsImageLoading(false);
    setIsPreviewOpen(false);
    setChatImage(null);
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
  }, [conversationId]);

  useEffect(() => {
    if (!socket || !conversationId) return;

    socket.emit("join", {
      conversation_id: conversationId,
      userId: user?.email!,
    });

    socket.on("receive_message", (message) => {
      console.log("recieved =======> ", message);
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
  }, [conversationId, isConnected, chatUser?.email]);

  if (!chatUser) return;

  return (
    <div
      className={cn(
        "flex flex-col justify-between max-h-full h-full",
        className
      )}
    >
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
        className="px-3 py-4 flex-1 flex flex-col gap-y-3 h-[30vh] overflow-y-auto max-h-full relative"
      >
        {messages &&
          messages.length > 0 &&
          messages.map((msg) => (
            <div key={msg._id}>
              <MessageItem
                text={msg?.text ?? ""}
                isSender={msg.sender == user?._id}
                date={msg.createdAt}
                images={msg.images}
                type={msg.type}
              />
            </div>
          ))}
      </div>

      <form
        onSubmit={sendMessage}
        className="relative px-3 pb-2 flex gap-x-3 items-center"
      >
        {isPreviewOpen && (
          <div className="absolute -top-full -translate-y-[90%] left-0 w-[50vw] h-[70vh] bg-charcoal/90 z-20 px-5 py-3 rounded">
            <div onClick={handlePreview} className="cursor-pointer">
              <CgClose size={28} className="text-white ml-auto" />
            </div>
            <div className="flex flex-col justify-between h-[95%]">
              {chatImage?.preview && (
                <div className="w-[40vw] h-[45vh] overflow-hidden mx-auto">
                  <NextImage src={chatImage.preview} className="object-cover" />
                </div>
              )}

              {chatImage?.file && (
                <div className="flex justify-end  w-full ">
                  <SpinnerButton
                    type="button"
                    isLoading={isImageLoading}
                    onClick={handleImageSend}
                    className="max-w-52 bg-primary "
                  >
                    Send
                  </SpinnerButton>
                </div>
              )}
            </div>{" "}
          </div>
        )}
        <label htmlFor="image" className="cursor-pointer">
          <GrGallery size={22} />
          <input
            type="file"
            name="image"
            id="image"
            className="hidden"
            onChange={handleChatImageChange}
          />
        </label>
        <div className="border border-charcoal-gray/50 rounded-md  w-full focus:border-blue-500 relative h-fit ">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            className={cn(
              `w-full mt-1 h-full placeholder:text-light-gray text-charcoal  px-2 py-2  rounded-md  focus:outline-0`
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
