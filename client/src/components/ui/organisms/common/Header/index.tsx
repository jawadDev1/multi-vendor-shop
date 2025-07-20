import NavMenu from "@/components/ui/molecules/NavMenu";
import UserProfile from "@/components/ui/molecules/UserProfile";
import UserCart from "@/components/ui/molecules/UserCart";
import Wishlist from "@/components/ui/molecules/Wishlist";
import UserMobileMenu from "../UserMobileMenu";
import Logo from "@/components/ui/atoms/common/Logo";
import Search from "@/components/ui/atoms/common/Search";
import AuthUser from "@/components/ui/atoms/common/AuthUser";
// import { loadCategories } from "@/features/category/categoryThunk";

const Header = () => {
  return (
    <>
      <header className=" hidden md:block bg-charcoal">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center py-3 ">
          <Logo />

          <Search />

          <AuthUser />
        </div>
      </header>
      {/* Second Nav  */}
      <div className="bg-charcoal border-t border-ultra-light/20 sticky top-0 z-20 hidden md:block">
        <div className="h-[60px]  max-w-[1200px] mx-auto  flex justify-between items-center">
          <NavMenu />
          <div className="flex items-center gap-x-4">
            <Wishlist />
            <UserCart />
            <UserProfile />
          </div>
        </div>
      </div>

      <UserMobileMenu />
    </>
  );
};

export default Header;
