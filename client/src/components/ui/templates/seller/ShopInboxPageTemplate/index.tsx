'use client';
import Content from "@/components/ui/atoms/typography/Content";
import SectionTitle from "@/components/ui/atoms/typography/SectionTitle";
import ChatCard from "@/components/ui/molecules/Cards/ChatCard";
import ChatBox from "@/components/ui/organisms/ChatBox";
import type { IAPISellerConversations } from "@/types/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ShopInboxPageTemplateProps {
  conversations: IAPISellerConversations[];
}

const ShopInboxPageTemplate = ({
  conversations,
}: ShopInboxPageTemplateProps) => {
  if (!conversations) return;

  if (conversations.length === 0) {
    <Content className="text-center">No chats</Content>;
  }
  const router = useRouter();
  const [activeChat, setActiveChat] = useState<IAPISellerConversations | null>(
    conversations[0] ?? null
  );
  const [isChatOpen, setIsChatOpen] = useState<boolean>(true);

  const handleActiveChat = (id: string) => {
    const chat = conversations.find((conv) => conv.group_title === id);
    if (chat) setActiveChat(chat);

    router.push(`?${chat?.group_title}`);
    setIsChatOpen(true);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
  };

  return (
    <div className=" h-full ">
      {!isChatOpen && (
        <>
          <SectionTitle className="text-center py-5 md:py-11">
            All Messages
          </SectionTitle>
          <div className="max-h-[70vh] overflow-y-auto mt-6 space-y-4">
            {conversations.map((conv, i) => (
              <ChatCard
                last_message={conv.last_message}
                key={i}
                name={conv.user.name}
                profile={conv.user.profile}
                isActive={conv.group_title === activeChat?.group_title}
                id={conv.group_title}
                handleClick={handleActiveChat}
              />
            ))}
          </div>
        </>
      )}

      {isChatOpen && activeChat && (
        <ChatBox chat={activeChat} handleChatClose={handleChatClose} />
      )}
      {
        conversations?.length === 0 && 
        <Content className="text-center mt-6">
          No conversations yet!
        </Content>
      }
    </div>
  );
};

export default ShopInboxPageTemplate;
