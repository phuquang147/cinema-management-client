import { IconX } from "@tabler/icons";
import React from "react";
import Logo from "./Logo";
import navConfig from "./navConfig";
import NavMobileItem from "./NavMobileItem";

type NavMobileProps = {
  onCloseNavMobile: () => void;
};

const NavMobile: React.FC<NavMobileProps> = ({ onCloseNavMobile }) => {
  return (
    <div className="fixed left-0 z-50 w-full h-screen">
      <div className="h-full relative">
        <div className="absolute left-0 h-full w-full bg-black bg-opacity-50 animate-fade-in"></div>
        <div className="absolute right-0 h-full w-3/4 ml-auto bg-white animate-float-right">
          <div className="flex justify-between">
            <div></div>
            <Logo color="red" />
            <button
              onClick={onCloseNavMobile}
              className="w-12 h-12 bg-primary text-white flex justify-center items-center"
            >
              <IconX />
            </button>
          </div>
          <div className="flex flex-col p-4">
            {navConfig.map((navItem) => (
              <NavMobileItem key={navItem.name} navItem={navItem} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavMobile;
