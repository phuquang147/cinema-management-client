import { IconChevronDown } from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import Divider from "~/components/UI/Divider";
import useClickOutside from "~/hooks/useClickOutside";
import { NavItemConfigProps } from "./navConfig";

type NavItemProps = {
  navItem: NavItemConfigProps;
  scrolled: boolean;
};

const NavItem: React.FC<NavItemProps> = ({ navItem, scrolled }) => {
  const { pathname } = useRouter();
  const [showChildren, setShowChildren] = useState<boolean>(false);
  const subMenuRef = useRef<HTMLDivElement>(null);

  const handleCloseChildren = () => {
    setShowChildren(false);
  };

  const handleToggleShowChildren = () => {
    setShowChildren((prev: boolean) => !prev);
  };

  useClickOutside(subMenuRef, handleCloseChildren);

  const match = () => {
    const pathFirstPart = navItem.link?.split("/")[1];
    const pathnameFirstPart = pathname.split("/")[1];
    return pathFirstPart === pathnameFirstPart;
  };

  return navItem.children ? (
    <div className="relative">
      <div
        className="bottom-border-hover py-3 flex items-center cursor-pointer"
        onClick={handleToggleShowChildren}
      >
        <span>{navItem.name}</span>
        <IconChevronDown className="h-4 w-4 ml-1" />
      </div>
      {showChildren && (
        <div
          ref={subMenuRef}
          className={`absolute left-0 top-16 z-50 w-52 bg-black bg-opacity-70`}
        >
          <Divider />
          <div className="p-2 flex flex-col">
            {navItem.children.map((subNavItem) => (
              <Link
                href={subNavItem.link}
                key={subNavItem.name}
                className="text-white p-2 hover:bg-gradient-to-r from-light-pink to-light-red rounded"
                onClick={handleCloseChildren}
              >
                {subNavItem.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  ) : (
    <Link
      href={navItem.link ? navItem.link : "/"}
      className={`bottom-border-hover py-3`}
    >
      {navItem.name}
    </Link>
  );
};

export default NavItem;
