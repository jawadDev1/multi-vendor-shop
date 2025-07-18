import cn from "@/utils/cn";
import React from "react";
import { CgLogOut } from "react-icons/cg";
import Subtitle2 from "../../atoms/typography/Subtitle2";
import { getApiRequest } from "@/utils/api";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/user-store";

const UserLogout = () => {
    const {updateUser} = useUserStore()
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const result = await getApiRequest("user/logout");

      if (!result?.success) return;

      notifySuccess(result?.message);

      router.push("/");
     updateUser(null);
    } catch (error) {
      notifyError(error as string);
    }
  };

  return (
    <div
      onClick={handleLogout}
      className=" hidden md:flex group items-center gap-x-3 cursor-pointer "
    >
      <CgLogOut
        className={cn(
          "size-[28px] text-charcoal-gray group-hover:text-azure-blue "
        )}
      />
      <Subtitle2
        className={cn("text-charcoal-gray group-hover:text-azure-blue")}
      >
        Logout
      </Subtitle2>
    </div>
  );
};

export default UserLogout;
