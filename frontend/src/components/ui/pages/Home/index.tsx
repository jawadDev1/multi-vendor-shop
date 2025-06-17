import React from "react";
import ModalWrapper from "../../molecules/ModalWrapper";
import ActivateAccountModal from "../../organisms/Modals/ActivateAccoutModal";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { loadUser } from "@/features/user/userThunks";
import HomePageTemplate from "../../templates/HomePageTemplate";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.user);
  const handleUser = () => {
    dispatch(loadUser());

    console.log("user =========> ", user);
  };

  return (
    <main className="max-w-[1200px mx-auto bg-gray-50">
      <HomePageTemplate />
    </main>
  );
};

export default HomePage;
