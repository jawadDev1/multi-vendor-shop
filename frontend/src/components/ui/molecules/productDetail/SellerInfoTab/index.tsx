import LinkButton from "@/components/ui/atoms/buttons/LinkButton";
import Image from "@/components/ui/atoms/common/Image";
import Content from "@/components/ui/atoms/typography/Content";
import Subtitle2 from "@/components/ui/atoms/typography/Subtitle2";
import Subtitle3 from "@/components/ui/atoms/typography/Subtitle3";

const SellerInfoTab = () => {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
      <div className="flex-1">
        <div className="flex gap-x-3 items-center ">
          <div className="size-12 rounded-full overflow-hidden">
            <Image
              src={"https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"}
            />
          </div>
          <div>
            <Subtitle2 className="text-azure-blue">Amazon</Subtitle2>
            <Subtitle3>(4.5) Rating</Subtitle3>
          </div>
        </div>

        <Content className="mt-4 lg:mt-6 max-w-[500px]">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum pariatur
          soluta perferendis eligendi provident! Officia ut, in voluptates
          quidem magni repudiandae tempora labore fugit non dolorum optio qui
          inventore dolorem quibusdam ex vel et vitae molestias est ad
          voluptatem eos laborum tenetur nihil. Voluptas nihil accusamus modi,
          iusto perferendis ea! Incidunt magni veniam nisi, doloremque,
        </Content>
      </div>

      <div className="flex flex-col gap-y-2 max-w-[300px] w-full">
        <Subtitle2>
          <span className="font-semibold">Joined On :</span>
          19 July, 2022
        </Subtitle2>
        <Subtitle2>
          <span className="font-semibold">Total Products :</span>
          1292
        </Subtitle2>
        <Subtitle2>
          <span className="font-semibold">Total Reviews :</span>
          141
        </Subtitle2>

        <LinkButton to={`/`} className="bg-primary text-white">
          Visit Shop
        </LinkButton>
      </div>
    </div>
  );
};

export default SellerInfoTab;
