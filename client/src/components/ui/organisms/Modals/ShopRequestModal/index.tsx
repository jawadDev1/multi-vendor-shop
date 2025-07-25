import Button from "@/components/ui/atoms/buttons/Button";
import Content from "@/components/ui/atoms/typography/Content";
import Subtitle from "@/components/ui/atoms/typography/Subtitle";
import ModalWrapper from "@/components/ui/molecules/ModalWrapper";

interface ShopRequestModalProps {
  isOpen: boolean;
  handleModal: () => void;
}

const ShopRequestModal = ({ isOpen, handleModal }: ShopRequestModalProps) => {
  return (
    <ModalWrapper isOpen={isOpen}>
      <div className="flex justify-center items-center flex-col text-center h-[90%] gap-6">
        <Subtitle>Request Submitted Successfully</Subtitle>

        <Content className="max-w-[500px]">
          Thank you for submitting your shop registration request. Our team has
          received your application and it is currently under review.
          <br />
          An administrator will carefully review the details you've provided.
          Once your request is approved, you will be notified via email .
          <br />
          We appreciate your patience during this process.
        </Content>

        <Button onClick={handleModal} className="max-w-28">
          Ok
        </Button>
      </div>
    </ModalWrapper>
  );
};

export default ShopRequestModal;
