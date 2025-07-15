import Image from "@/components/ui/atoms/common/Image";
import CardTitle from "@/components/ui/atoms/typography/CardTitle";
import Content from "@/components/ui/atoms/typography/Content";
import cn from "@/utils/cn";

interface ChatCardProps {
  name: string;
  profile: string;
  last_message: string | null;
  isActive: boolean;
  handleClick: (index: string) => void;
  id: string;
}

const ChatCard = ({
  name,
  profile,
  last_message,
  isActive = false,
  handleClick,
  id,
}: ChatCardProps) => {
  return (
    <div
      className={cn("flex gap-x-2 items-center bg-transparent px-5 py-2 cursor-pointer", {
        "bg-blue-100/60": isActive,
      })}
      onClick={() => handleClick(id)}
    >
      <div className="relative">
        <div className="size-16 rounded-full overflow-hidden ">
          <Image src={profile} className="object-cover" />
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
