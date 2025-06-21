import React from "react";
import ProfilePageTemplate from "../../templates/ProfilePageTemplate";
import { useAppSelector } from "@/app/hooks";

const ProfilePage = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <>
      <ProfilePageTemplate user={user} />
    </>
  );
};

export default ProfilePage;
