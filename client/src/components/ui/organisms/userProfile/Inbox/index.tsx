'use client';
import Content from "@/components/ui/atoms/typography/Content";
import SectionTitle from "@/components/ui/atoms/typography/SectionTitle";
import ChatCard from "@/components/ui/molecules/Cards/ChatCard";
import type { IAPIUserConversations } from "@/types/api";
import { notifyError } from "@/utils/toast";
import React, { useEffect, useState } from "react";
import ChatBox from "../../ChatBox";
import { getApiRequest } from "@/utils/api";
import { useRouter } from "next/navigation";

const InboxSection = () => {
  const [conversations, setConversations] = useState<IAPIUserConversations[]>([])  

  
  const router = useRouter();
  const [activeChat, setActiveChat] = useState<IAPIUserConversations | null>(
    conversations[0] ?? null
  );
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const handleActiveChat = (id: string) => {
    const chat = conversations.find((conv) => conv.group_title === id);
    if (chat) setActiveChat(chat);

    router.push(`?${chat?.group_title}`);
    setIsChatOpen(true);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
  };

  useEffect(() => {

    (async () => {
      const result = await getApiRequest("conversation/user-conversations");

      if(!result?.success) {
        notifyError(result?.message);
        return
      }

      setConversations(result?.data)
    })()

  }, []);

if (conversations.length === 0) {
    <Content className="text-center">No chats</Content>;
  }

  return (
    <div className=" h-full ">
      {!isChatOpen && (
        <>
          <SectionTitle className="text-center ">
            All Messages
          </SectionTitle>
          <div className="max-h-[70vh] overflow-y-auto mt-6 space-y-4">
            {conversations.map((conv, i) => (
              <ChatCard
                last_message={conv.last_message}
                key={i}
                name={conv.seller?.name}
                profile={conv.seller?.profile}
                isActive={conv.group_title === activeChat?.group_title}
                id={conv.group_title}
                handleClick={handleActiveChat}
              />
            ))}
          </div>
        </>
      )}

      {isChatOpen && activeChat && (
        <ChatBox className="max-h-[80vh]" chat={activeChat} handleChatClose={handleChatClose} />
      )}
    </div>
  );
};

export default InboxSection;
