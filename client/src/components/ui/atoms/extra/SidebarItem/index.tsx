import React, { type ReactSVGElement } from "react";
import Subtitle2 from "../../typography/Subtitle2";
import cn from "@/utils/cn";
import Content from "../../typography/Content";
import Link from "next/link";

interface SidebarItemProps {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  link: string;
  className?: string;
  isActive: boolean;
}

const SidebarItem = ({
  Icon,
  isActive,
  link,
  title,
  className,
}: SidebarItemProps) => {
  return (
    <Link
      href={link}
      className={cn("flex group items-center gap-2 cursor-pointer ", className)}
    >
      <Icon
        className={cn(
          "size-7 lg:size-8 text-white group-hover:text-primary",
          {
            "text-primary": isActive,
          }
        )}
      />
      <Content
        className={cn(" hidden text-white md:block group-hover:text-primary", {
          "text-primary ": isActive,
        })}
      >
        {title}
      </Content>
    </Link>
  );
};

export default SidebarItem;
