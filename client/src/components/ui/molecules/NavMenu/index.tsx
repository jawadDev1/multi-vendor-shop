"use client";
import { NAV_ITEMS } from "@/constants/data";
import cn from "@/utils/cn";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

const NavMenu = () => {
  const activeSegment = useSelectedLayoutSegment();
  return (
    <ul className="flex flex-col md:flex-row lg:items-center justify-center gap-7">
      {NAV_ITEMS.map((item) => (
        <li key={item.link}>
          <Link
            className={cn(
              "text-subtitle2-sm lg:text-subtitle2 text-white hover:text-primary font-[500]",
              {
                "text-primary":
                  `/${activeSegment}` === item.link ||
                  (activeSegment === null && item.link == "/"),
              }
            )}
            href={item.link}
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavMenu;
