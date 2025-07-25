'use client';
import NextImage from "@/components/ui/atoms/common/NextImage";

import UserCart from "@/components/ui/molecules/UserCart";
import UserMobileNav from "@/components/ui/molecules/UserMobileNav";
import UserProfile from "@/components/ui/molecules/UserProfile";
import Wishlist from "@/components/ui/molecules/Wishlist";
import { useUserStore } from "@/stores/user-store";


const UserMobileMenu = () => {
  const { isAuthenticated, user  } = useUserStore();

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-charcoal shadow sticky top-0 z-20 md:hidden">
      <UserMobileNav {...{ isAuthenticated, user }} />

      <div className="w-[2rem]  overflow-hidden">
        <NextImage src={"/images/logo.png"} className="object-cover" />
      </div>

      <div className="flex items-center gap-x-3">
        <UserCart />
        <Wishlist />
        <UserProfile  />
      </div>
    </header>
  );
};

export default UserMobileMenu;
