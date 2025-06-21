import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { loadUser } from "@/features/user/userThunks";
import  { useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router";
import Image from "../../atoms/common/Image";

const UserProfile = () => {
  const dispatch = useAppDispatch();
  const { user, loading, isAuthenticated } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  if (loading) return null;

  return user && isAuthenticated ? (
    <Link className=" size-[26px] lg:size-[34px] rounded-full overflow-hidden" to={"/profile"}>
      <Image src={user?.profile} />
    </Link>
  ) : (
    <Link to={"/login"}>
      <CgProfile className="size-[26px] lg:size-7" color="white" />
    </Link>
  );
};

export default UserProfile;
