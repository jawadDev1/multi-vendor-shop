import LinkButton from "@/components/ui/atoms/buttons/LinkButton";
import Image from "@/components/ui/atoms/common/Image";
import Content from "@/components/ui/atoms/typography/Content";
import Subtitle2 from "@/components/ui/atoms/typography/Subtitle2";
import Subtitle3 from "@/components/ui/atoms/typography/Subtitle3";
import type { IAPIUserShop } from "@/types/api";
import { formateDate } from "@/utils";

const SellerInfoTab = ({ shop }: { shop: IAPIUserShop | null }) => {
  if (!shop) {
    return <Content>Shop info not found</Content>;
  }

  const { shop_name, logo, createdAt, about, slug } = shop;

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
      <div className="flex-1">
        <div className="flex gap-x-3 items-center ">
          <div className="size-12 rounded-full overflow-hidden">
            <Image src={logo} />
          </div>
          <div>
            <Subtitle2 className="text-azure-blue">{shop_name}</Subtitle2>
            <Subtitle3>(4.5) Rating</Subtitle3>
          </div>
        </div>

        <Content className="mt-4 lg:mt-6 max-w-[500px]">{about}</Content>
      </div>

      <div className="flex flex-col gap-y-2 max-w-[300px] w-full">
        <Subtitle2>
          <span className="font-semibold">Joined On : </span>
          {formateDate(createdAt!)}
        </Subtitle2>
        <Subtitle2>
          <span className="font-semibold">Total Products :</span>
          1292
        </Subtitle2>
        <Subtitle2>
          <span className="font-semibold">Total Reviews :</span>
          141
        </Subtitle2>

        <LinkButton to={`/shop/${slug}`} className="bg-primary text-white">
          Visit Shop
        </LinkButton>
      </div>
    </div>
  );
};

export default SellerInfoTab;
