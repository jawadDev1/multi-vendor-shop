import { CgProfile } from "react-icons/cg";
import { Link } from "react-router";
import Image from "../../atoms/common/Image";
import type { IAPIUser } from "@/types/api";

interface UserProfileProps {
  user: IAPIUser | null;
  loading: boolean;
  isAuthenticated: boolean;
}

const UserProfile = ({ isAuthenticated, loading, user }: UserProfileProps) => {
  if (loading) return null;

  return user && isAuthenticated ? (
    <Link
      className=" size-[26px] lg:size-[34px] rounded-full overflow-hidden"
      to={"/profile"}
    >
      <Image src={user?.profile} className="object-cover" />
    </Link>
  ) : (
    <Link to={"/login"}>
      <CgProfile className="size-[26px] lg:size-7" color="white" />
    </Link>
  );
};

export default UserProfile;
