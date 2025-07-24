import CardTitle from "@/components/ui/atoms/typography/CardTitle";
import Content from "@/components/ui/atoms/typography/Content";
import NextImage from "@/components/ui/atoms/common/NextImage";
import { formateDate } from "@/utils";

interface ShopAboutProps {
  logo: string;
  shop_name: string;
  address: string;
  contact: number;
  createdAt: string;
  rating: number;
  totalProducts: number;
}

const ShopAbout = ({
  logo,
  shop_name,
  address,
  contact,
  createdAt,
  rating,
  totalProducts,
}: ShopAboutProps) => {
  return (
    <div className="w-full h-fit static lg:sticky top-[80px] shadow bg-white rounded-md py-4 px-3">
      <div>
        <div className="size-32 rounded-full mx-auto mb-3 overflow-hidden ">
          <NextImage src={logo} className="object-cover" />
        </div>
        <CardTitle className="text-center">{shop_name}</CardTitle>
      </div>

      <div className="mt-10 space-y-4">
        <div>
          <Content className="!font-semibold ">Address</Content>
          <Content>{address}</Content>
        </div>
        <div>
          <Content className="!font-semibold ">Contact</Content>
          <Content>{contact}</Content>
        </div>
        <div>
          <Content className="!font-semibold ">Total Products</Content>
          <Content>{totalProducts}</Content>
        </div>
        <div>
          <Content className="!font-semibold ">Shop Ratings</Content>
          {rating == 0 && <Content>Not rated yet</Content>}
          {rating !== 0 && <Content>{rating}/5</Content>}
        </div>
        <div>
          <Content className="!font-semibold ">Joined On</Content>
          <Content>{formateDate(createdAt)}</Content>
        </div>
      </div>
    </div>
  );
};

export default ShopAbout;
