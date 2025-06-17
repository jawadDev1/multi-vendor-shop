import React from "react";
import ModalWrapper from "../../molecules/ModalWrapper";
import ActivateAccountModal from "../../organisms/Modals/ActivateAccoutModal";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { loadUser } from "@/features/user/userThunks";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.user);
  const handleUser = () => {
    dispatch(loadUser());

    console.log("user =========> ", user);
  };

  return (
    <div className="flex items-center justify-center bg-[#F9FAFB]">
      Running
      <h1 className="text-primar">TEstging</h1>
      <button onClick={handleUser} className="py-4 px-4 bg-azure-blue">
        testing
      </button>
    </div>
  );
};

export default HomePage;
