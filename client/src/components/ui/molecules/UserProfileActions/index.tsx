import cn from "@/utils/cn";
import React from "react";
import { CgLogOut } from "react-icons/cg";
import Subtitle2 from "../../atoms/typography/Subtitle2";
import { getApiRequest } from "@/utils/api";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/user-store";
import Link from "next/link";
import { RiAdminFill } from "react-icons/ri";

const UserProfileActions = () => {
  const { user, updateUser } = useUserStore();
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
    <React.Fragment key={user?.name}>
      {user && user.role == "ADMIN" && (
        <Link
          href={"/hokage"}
          className=" hidden md:flex group items-center gap-x-3 cursor-pointer "
        >
          <RiAdminFill
            className={cn(
              "size-[28px] text-charcoal-gray group-hover:text-primary "
            )}
          />
          <Subtitle2
            className={cn("text-charcoal-gray group-hover:text-primary")}
          >
            Hokage Panel
          </Subtitle2>
        </Link>
      )}

      <div
        onClick={handleLogout}
        className=" flex group items-center gap-x-3 cursor-pointer "
      >
        <CgLogOut
          className={cn(
            "size-[28px] text-charcoal-gray group-hover:text-primary "
          )}
        />
        <Subtitle2
          className={cn("text-charcoal-gray group-hover:text-primary")}
        >
          Logout
        </Subtitle2>
      </div>
    </React.Fragment>
  );
};

export default UserProfileActions;
