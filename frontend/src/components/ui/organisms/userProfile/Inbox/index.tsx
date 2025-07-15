import { useAppDispatch, useAppSelector } from "@/app/hooks";
import Content from "@/components/ui/atoms/typography/Content";
import SectionTitle from "@/components/ui/atoms/typography/SectionTitle";
import ChatCard from "@/components/ui/molecules/Cards/ChatCard";
import { loadUserConversations } from "@/features/user/userThunks";
import type { IAPIUserConversations } from "@/types/api";
import { notifyError } from "@/utils/toast";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ChatBox from "../../ChatBox";

const InboxSection = () => {
  const dispatch = useAppDispatch();
  const { conversations, error, loading } = useAppSelector(
    (state) => state.user
  );

  if (conversations.length === 0) {
    <Content className="text-center">No chats</Content>;
  }
  const navigate = useNavigate();
  const [activeChat, setActiveChat] = useState<IAPIUserConversations | null>(
    conversations[0] ?? null
  );
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const handleActiveChat = (id: string) => {
    const chat = conversations.find((conv) => conv.group_title === id);
    if (chat) setActiveChat(chat);

    navigate(`?${chat?.group_title}`);
    setIsChatOpen(true);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
  };

  useEffect(() => {
    dispatch(loadUserConversations());

    if (error) {
      notifyError(error);
    }
  }, []);

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
                name={conv.seller.name}
                profile={conv.seller.profile}
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
    </div>
  );
};

export default InboxSection;
