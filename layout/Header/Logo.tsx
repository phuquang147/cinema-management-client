import Image from "next/image";
import React from "react";
import logoRed from "~/assets/images/logo-red.svg";
import logoWhite from "~/assets/images/logo-white.svg";

type LogoProps = {
  color: "white" | "red";
};

const Logo: React.FC<LogoProps> = ({ color }) => {
  return (
    <Image
      src={color === "red" ? logoRed : logoWhite}
      alt=""
      className="cursor-pointer"
    />
  );
};

export default Logo;
