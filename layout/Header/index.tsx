import { IconMenu2 } from "@tabler/icons";
import React, { useEffect, useRef, useState } from "react";
import Button from "~/components/UI/Button";
import Logo from "./Logo";
import Nav from "./Nav";
import NavMobile from "./NavMobile";
import Profile from "./Profile";
import ToggleDarkMode from "./ToggleDarkMode";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [openNavMobile, setOpenNavMobile] = useState<boolean>(false);

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {}, []);

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
      className={`bg-white dark:bg-gray-900 text-gray-text dark:text-light-text ${
        scrolled ? "fixed top-0 animate-float-top " : ""
      } h-20 w-full transition-all duration-300 border-slate-700 z-40 shadow`}
    >
      <div className="container mx-auto h-full flex justify-between items-center">
        <Logo />
        <Nav scrolled={scrolled} />
        <div className="hidden lg:flex gap-4 items-center">
          <ToggleDarkMode />
          <Profile />
        </div>
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
