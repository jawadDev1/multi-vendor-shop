import Button from "@/components/ui/atoms/buttons/Button";
import Content from "@/components/ui/atoms/typography/Content";
import Subtitle from "@/components/ui/atoms/typography/Subtitle";
import ModalWrapper from "@/components/ui/molecules/ModalWrapper";

interface ActivateAccountModalProps {
  isOpen: boolean;
  handleModal: () => void;
}

const ActivateAccountModal = ({
  isOpen,
  handleModal,
}: ActivateAccountModalProps) => {
  return (
    <ModalWrapper isOpen={isOpen}>
      <div className="flex justify-center items-center flex-col text-center h-[90%] gap-6">
        <Subtitle>Activate Account</Subtitle>

        <Content className="max-w-[500px]">
          Thank you for registering with us.
          <br />
          We've sent a verification email to your registered email address.
          Please check your inbox and follow the activation link to verify your
          account. If you do not see the email within a few minutes, please
          check your spam or junk folder.
        </Content>

        <Button onClick={handleModal} className="max-w-28">
          Ok
        </Button>
      </div>
    </ModalWrapper>
  );
};

export default ActivateAccountModal;
