import CardTitle from "@/components/ui/atoms/typography/CardTitle";
import Content from "@/components/ui/atoms/typography/Content";
import Button from "@/components/ui/atoms/buttons/Button";
import Image from "@/components/ui/atoms/common/Image";
import LinkButton from "../../atoms/buttons/LinkButton";
import { formateDate } from "@/utils";
import { useAppSelector } from "@/app/hooks";

interface ShopAboutProps {
  logo: string;
  shop_name: string;
  address: string;
  contact: number;
  createdAt: string;
  owner: string;
}

const ShopAbout = ({
  logo,
  shop_name,
  address,
  contact,
  createdAt,
  owner,
}: ShopAboutProps) => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="w-full h-fit static lg:sticky top-[80px] shadow bg-white rounded-md py-4 px-3">
      <div>
        <div className="size-32 rounded-full mx-auto mb-3 overflow-hidden ">
          <Image src={logo} className="object-cover" />
        </div>
        <CardTitle className="text-center">{shop_name}</CardTitle>
      </div>

      <div className="mt-10 space-y-4">
        <div>
          <Content className="!font-semibold text-primary">Address</Content>
          <Content>{address}</Content>
        </div>
        <div>
          <Content className="!font-semibold text-primary">Contact</Content>
          <Content>{contact}</Content>
        </div>
        <div>
          <Content className="!font-semibold text-primary">
            Total Products
          </Content>
          <Content>10</Content>
        </div>
        <div>
          <Content className="!font-semibold text-primary">
            Shop Ratings
          </Content>
          <Content>4/5</Content>
        </div>
        <div>
          <Content className="!font-semibold text-primary">Joined On</Content>
          <Content>{formateDate(createdAt)}</Content>
        </div>
      </div>

      {user?._id === owner && (
        <div className="mt-6 space-y-3">
          <Button>Edit Shop</Button>
          <LinkButton className="mt-3" to="/seller">
            Dashboard
          </LinkButton>
        </div>
      )}
    </div>
  );
};

export default ShopAbout;
