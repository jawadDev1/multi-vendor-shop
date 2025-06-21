import VisaIcon from "@/components/icons/VisaIcon";
import Button from "@/components/ui/atoms/buttons/Button";
import CardTitle from "@/components/ui/atoms/typography/CardTitle";
import Content from "@/components/ui/atoms/typography/Content";
import SectionTitle from "@/components/ui/atoms/typography/SectionTitle";
import { CgTrash } from "react-icons/cg";

const PaymentMethodsSection = () => {
  return (
    <>
      <div className="flex justify-between items-center gap-x-4 ">
        <SectionTitle>Payment Methods</SectionTitle>

        <Button className="bg-primary max-w-[160px] ">Add new</Button>
      </div>

      <div className="mt-10 lg:mt-20">
        <div className="bg-white shadow rounded-md py-3 px-3 items-center gap-3 grid grid-cols-[10%,1fr,20%,10%] ">
          <div>
            <VisaIcon className="size-10 text-blue-700" />
          </div>
          <CardTitle>Uzumaki Naruto</CardTitle>
          <div className="flex items-center gap-x-3">
            <Content className="hidden sm:block">1234 **** **** ****</Content>
            <Content>08/2022</Content>
          </div>

          <CgTrash size={28} color="red" className="cursor-pointer" />
        </div>
      </div>
    </>
  );
};

export default PaymentMethodsSection;
