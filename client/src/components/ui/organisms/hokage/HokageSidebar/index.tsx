'use client';
import SidebarItem from "@/components/ui/atoms/extra/SidebarItem";
import { ADMIN_SIDEBAR_ITEMS } from "@/constants/data";

import { usePathname } from "next/navigation";

const HokageSidebar = () => {
  const  pathname  = usePathname();
  const currentPage = pathname?.split("/")[2] ?? "dashboard";

  return (
    <aside className="shadow h-[calc(100vh-88px)] overflow-y-auto bg-blue-gray  px-3 py-8 flex flex-col gap-6 lg:gap-9">
      {ADMIN_SIDEBAR_ITEMS.map(({ title, slug, link, Icon }) => (
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

export default HokageSidebar;
