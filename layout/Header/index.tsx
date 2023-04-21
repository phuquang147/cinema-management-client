import { IconMenu2 } from "@tabler/icons";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import Button from "~/components/UI/Button";
import Logo from "./Logo";
import Nav from "./Nav";
import NavMobile from "./NavMobile";
import Link from "next/link";
import Image from "next/image";

const Header: React.FC = () => {
  const { data: session } = useSession();

  const [scrolled, setScrolled] = useState<boolean>(false);
  const [openNavMobile, setOpenNavMobile] = useState<boolean>(false);

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > headerRef.current!.offsetTop && !scrolled)
      setScrolled(true);
    else setScrolled(false);
  };

  const handleCloseNavMobile = () => {
    setOpenNavMobile(false);
  };

  const handleToggleNavMobile = () => {
    setOpenNavMobile((prev) => !prev);
  };

  return openNavMobile ? (
    <NavMobile onCloseNavMobile={handleCloseNavMobile} />
  ) : (
    <header
      ref={headerRef}
      className={`bg-gray-900 text-gray-200 ${
        scrolled ? "fixed top-0 animate-float-top " : ""
      } h-20 w-full transition-all duration-300 border-slate-700 z-40 shadow`}
    >
      <div className="container mx-auto h-full flex justify-between items-center">
        <Logo color="red" />
        <Nav scrolled={scrolled} />
        {session ? (
          <Link href="/tai-khoan" className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image
                src="/assets/images/user.png"
                fill
                alt=""
                draggable={false}
              />
            </div>
            <p className="text-white">{session.user?.user?.name}</p>
          </Link>
        ) : (
          <Button className="hidden lg:block" to="/dang-nhap">
            Đăng nhập
          </Button>
        )}
        <Button
          variant="icon"
          onClick={handleToggleNavMobile}
          className="lg:hidden"
        >
          <IconMenu2 />
        </Button>
      </div>
    </header>
  );
};

export default Header;
