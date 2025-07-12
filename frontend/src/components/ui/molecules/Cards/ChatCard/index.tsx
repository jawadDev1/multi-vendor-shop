import Image from "@/components/ui/atoms/common/Image";
import CardTitle from "@/components/ui/atoms/typography/CardTitle";
import Content from "@/components/ui/atoms/typography/Content";

interface ChatCardProps {
  name: string;
  profile: string;
  last_message: string | null;
}

const ChatCard = ({ name, profile, last_message }: ChatCardProps) => {
  return (
    <div className="flex gap-x-2 items-center bg-blue-100/60 px-5 py-2 ">
      <div className="relative">
        <div className="size-16 rounded-full overflow-hidden ">
          <Image src={profile} />
        </div>
        <div className="size-3 bg-primary-green rounded-full  absolute right-1 bottom-1" />
      </div>
      <div className="space-y-1">
        <CardTitle>{name}</CardTitle>
        <Content>{last_message ?? ""}</Content>
      </div>
    </div>
  );
};

export default ChatCard;
