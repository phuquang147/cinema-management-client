import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="relative h-10 w-52 flex justify-start">
      <Image
        src="/assets/images/logo-text-red.png"
        alt=""
        fill
        objectFit="contain"
        className="cursor-pointer"
      />
    </Link>
  );
};

export default Logo;
