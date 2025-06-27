import SidebarItem from "@/components/ui/atoms/extra/SidebarItem";

import { useLocation } from "react-router";
import { SHOP_SIDEBAR_ITEMS } from "@/constants/data";

const SellerSidebar = () => {
  const { pathname } = useLocation();
  const currentPage = pathname?.split("/")[2] ?? "dashboard";

  return (
    <aside className="shadow h-[calc(100vh-88px)] overflow-y-auto bg-gray-100/70 px-3 py-8 flex flex-col gap-6 lg:gap-9">
      {SHOP_SIDEBAR_ITEMS.map(({ title, slug, link, Icon }) => (
        <SidebarItem
          key={slug}
          title={title}
          link={link}
          Icon={Icon}
          isActive={currentPage === slug}
        />
      ))}
    </aside>
  );
};

export default SellerSidebar;
