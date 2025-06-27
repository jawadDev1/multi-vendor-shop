import CardTitle from "@/components/ui/atoms/typography/CardTitle";
import Content from "@/components/ui/atoms/typography/Content";
import Button from "@/components/ui/atoms/buttons/Button";
import Image from "@/components/ui/atoms/common/Image";
import LinkButton from "../../atoms/buttons/LinkButton";

const ShopAbout = () => {
  return (
    <div className="w-full h-fit sticky top-[80px] shadow bg-white rounded-md py-4 px-3">
      <div>
        <div className="size-32 rounded-full mx-auto mb-3 overflow-hidden ">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIRA4HrscMjPWmrk2xHgZ37AyO6tmgYwHq8Q&s"
            className="object-cover"
          />
        </div>
        <CardTitle className="text-center">Ichiruku Ramen</CardTitle>
      </div>

      <div className="mt-10 space-y-4">
        <div>
          <Content className="!font-semibold text-primary">Address</Content>
          <Content>Hidden Leaf village fire nation</Content>
        </div>
        <div>
          <Content className="!font-semibold text-primary">Contact</Content>
          <Content>+92 3029382123</Content>
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
          <Content>July 20, 2024</Content>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <Button>Edit Shop</Button>
        <LinkButton className="mt-3" to="/seller">
          Dashboard
        </LinkButton>
      </div>
    </div>
  );
};

export default ShopAbout;
