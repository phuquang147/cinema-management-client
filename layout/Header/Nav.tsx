import React from "react";
import navConfig from "./navConfig";
import NavItem from "./NavItem";

type NavProps = {
  scrolled: boolean;
};

const Nav: React.FC<NavProps> = ({ scrolled }) => {
  return (
    <div className="hidden lg:block text-base font-semibold">
      <div className="h-full flex items-center gap-x-8">
        {navConfig.map((navItem) => (
          <NavItem key={navItem.name} navItem={navItem} scrolled={scrolled} />
        ))}
      </div>
    </div>
  );
};

export default Nav;
