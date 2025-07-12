import Content from "@/components/ui/atoms/typography/Content";
import SectionTitle from "@/components/ui/atoms/typography/SectionTitle";
import ChatCard from "@/components/ui/molecules/Cards/ChatCard";
import type { IAPISellerConversations } from "@/types/api";

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

  return (
    <div className="py-5 md:py-11 ">
      <SectionTitle className="text-center">All Messages</SectionTitle>

      <div className="max-h-[70vh] overflow-y-auto mt-6 space-y-4">
        {conversations.map((conv) => (
          <ChatCard
            last_message={conv.last_message}
            name={conv.user.name}
            profile={conv.user.profile}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopInboxPageTemplate;
