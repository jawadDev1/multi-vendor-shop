import NextImage from "@/components/ui/atoms/common/NextImage";

import UserCart from "@/components/ui/molecules/UserCart";
import UserMobileNav from "@/components/ui/molecules/UserMobileNav";
import UserProfile from "@/components/ui/molecules/UserProfile";
import Wishlist from "@/components/ui/molecules/Wishlist";
import type { IAPIUser } from "@/types/api";

interface UserMobileMenuProps {
  user: IAPIUser | null;
  loading: boolean;
  isAuthenticated: boolean;
}

const UserMobileMenu = ({
  isAuthenticated,
  loading,
  user,
}: UserMobileMenuProps) => {
  return (
    <header className="flex items-center justify-between px-4 py-1 bg-gray-50 shadow sticky top-0 z-20 md:hidden">
      <UserMobileNav {...{ isAuthenticated, user }} />

      <div className="w-[5rem] h-[3rem] overflow-hidden">
       <NextImage src={"/images/logo2.png"} className="object-cover" />
      </div>

      <div className="flex items-center gap-x-3">
        <UserCart />
        <Wishlist />
        <UserProfile {...{ isAuthenticated, user, loading }} />
      </div>
    </header>
  );
};

export default UserMobileMenu;
