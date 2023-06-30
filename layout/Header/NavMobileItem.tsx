import { IconMinus, IconPlus } from "@tabler/icons";
import Link from "next/link";
import { useState } from "react";
import { NavItemConfigProps } from "./navConfig";

interface NavMobileItemProps {
  navItem: NavItemConfigProps;
}

const NavMobileItem: React.FC<NavMobileItemProps> = ({ navItem }) => {
  const [openSubMenu, setOpenSubMenu] = useState<boolean>(false);

  const toggleOpenSubMenu = () => {
    setOpenSubMenu((prev) => !prev);
  };

  return navItem.children ? (
    <div className="w-full">
      <button
        onClick={toggleOpenSubMenu}
        className={`w-full py-2 px-4 flex justify-between items-center text-base font-bold ${
          openSubMenu
            ? "bg-primary text-white"
            : "text-gray-text dark:text-light-text hover:bg-slate-100"
        } rounded`}
      >
        {navItem.name}
        {openSubMenu ? <IconMinus /> : <IconPlus className="text-primary" />}
      </button>
      {openSubMenu && (
        <div className="w-full flex flex-col">
          {navItem.children.map((subNavItem) => (
            <Link
              key={subNavItem.name}
              href={subNavItem.link ? subNavItem.link : "/"}
              className="w-full py-2 pl-8 pr-4 text-gray-text dark:text-light-text text-base font-bold hover:bg-slate-100 rounded"
            >
              {navItem.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  ) : (
    <Link
      href={navItem.link ? navItem.link : "/"}
      className="py-2 px-4 text-gray-text dark:text-light-text text-base font-bold hover:bg-slate-100 dark:hover:bg-dark-bg-secondary rounded"
    >
      {navItem.name}
    </Link>
  );
};
export default NavMobileItem;
