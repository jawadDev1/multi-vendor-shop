import VisaIcon from "@/components/icons/VisaIcon";
import Button from "@/components/ui/atoms/buttons/Button";
import CardTitle from "@/components/ui/atoms/typography/CardTitle";
import Content from "@/components/ui/atoms/typography/Content";
import SectionTitle from "@/components/ui/atoms/typography/SectionTitle";
import Subtitle2 from "@/components/ui/atoms/typography/Subtitle2";
import { CgTrash } from "react-icons/cg";

const AddressSection = () => {
  return (
    <>
      <div className="flex justify-between items-center gap-x-4 ">
        <SectionTitle>Addresses</SectionTitle>

        <Button className="bg-primary max-w-[160px] ">Add new</Button>
      </div>

      <div className="mt-10 lg:mt-20">
        <div className="bg-white shadow rounded-md py-3 px-3 items-center grid grid-cols-[10%,1fr,1fr,10%] ">
          <Subtitle2>Default</Subtitle2>

          <CardTitle>Uzumaki Naruto</CardTitle>

          <Content>92 304 3292012</Content>

          <CgTrash size={28} color="red" className="cursor-pointer" />
        </div>
      </div>
    </>
  );
};

export default AddressSection;
