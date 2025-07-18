
import { Toaster } from "sonner";
import Header from "../ui/organisms/common/Header";
import { Outlet } from "react-router";

const ProfileLayout = () => {
  return (
    <>
      <Toaster closeButton={true} richColors={true} position="top-right" />
      <Header />
      <Outlet />
    </>
  );
};

export default ProfileLayout;
