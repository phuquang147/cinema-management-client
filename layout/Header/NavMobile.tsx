import { IconX } from "@tabler/icons";
import React from "react";
import Logo from "./Logo";
import navConfig from "./navConfig";
import NavMobileItem from "./NavMobileItem";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Button from "~/components/UI/Button";
import ToggleDarkMode from "./ToggleDarkMode";

type NavMobileProps = {
  onCloseNavMobile: () => void;
};

const NavMobile: React.FC<NavMobileProps> = ({ onCloseNavMobile }) => {
  const { data: session } = useSession();

  return (
    <div className="fixed left-0 z-50 w-full h-screen">
      <div className="h-full relative">
        <div className="absolute left-0 h-full w-full bg-black bg-opacity-50 animate-fade-in"></div>
        <div className="absolute right-0 h-full w-3/4 ml-auto bg-white dark:bg-dark-bg-primary animate-float-right">
          <div className="flex justify-between items-center">
            <Logo />
            <div className="flex items-center gap-8">
              <ToggleDarkMode />
              <button
                onClick={onCloseNavMobile}
                className="w-12 h-12 bg-primary text-white flex justify-center items-center"
              >
                <IconX />
              </button>
            </div>
          </div>
          <div className="flex justify-center mt-8 mb-4">
            {session ? (
              <Link
                href="/tai-khoan"
                className="min-w-fit flex items-center gap-2"
              >
                <div className="relative w-8 h-8">
                  <Image
                    src="/assets/images/user.png"
                    fill
                    alt=""
                    draggable={false}
                  />
                </div>
                <p className="text-gray-text dark:text-light-text">
                  {session.user?.name}
                </p>
              </Link>
            ) : (
              <div>
                <Button to="/dang-nhap">Đăng nhập</Button>
              </div>
            )}
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
