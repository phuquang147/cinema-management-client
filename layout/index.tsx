import { IconArrowNarrowUp } from "@tabler/icons";
import React, { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      {children}
      <button className="fixed right-10 bottom-10 text-white text-2xl z-50 animate-bounce bg-primary p-2 rounded-full bg-opacity-80">
        <IconArrowNarrowUp className="h-10 w-10" />
      </button>
      <Footer />
    </div>
  );
};

export default Layout;
