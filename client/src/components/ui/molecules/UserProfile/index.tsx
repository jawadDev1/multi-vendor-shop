import { CgProfile } from "react-icons/cg";
import type { IAPIUser } from "@/types/api";
import Link from "next/link";
import NextImage from "../../atoms/common/NextImage";

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
      href={"/profile"}
    >
     <NextImage src={user?.profile} className="object-cover" />
    </Link>
  ) : (
    <Link href={"/login"}>
      <CgProfile className="size-[26px] lg:size-7" color="white" />
    </Link>
  );
};

export default UserProfile;
