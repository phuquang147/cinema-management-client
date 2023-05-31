import { IconSend } from "@tabler/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Divider from "~/components/UI/Divider";

const links: { text: string; to: string }[] = [
  {
    text: "Phim",
    to: "/phim",
  },
  {
    text: "Lịch Chiếu",
    to: "/lich-chieu",
  },
  {
    text: "Bình luận phim",
    to: "/binh-luan-phim",
  },
];

const Footer: React.FC = () => {
  return (
    <div>
      <Divider />
      <div className="w-full pt-10 pb-20 bg-footer bg-contain lg:bg-cover bg-no-repeat bg-bottom lg:bg-center bg-white dark:bg-bgColor">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-y-6">
          <div className="relative h-24 w-3/4">
            <Image
              src="/assets/images/logo-text-red.png"
              alt=""
              fill
              objectFit="contain"
            ></Image>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-text dark:text-light-text">
              Liên Kết
            </h3>
            <div className="flex flex-col gap-y-2 mt-2">
              {links.map((link) => (
                <Link
                  key={link.to}
                  href={link.to}
                  className="text-sm text-gray-text dark:text-light-text hover:text-primary"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-text dark:text-light-text">
              Đăng Ký
            </h3>
            <p className="text-sm text-gray-text dark:text-light-text mt-2">
              Đăng ký để nhận tin khuyến mãi mới nhất
            </p>
            <div className="flex mt-4">
              <input
                type="text"
                placeholder="Email"
                className="flex-1 outline-none py-3 px-6 rounded-l-full bg-gray-100 dark:bg-bg-color-secondary text-gray-text dark:text-light-text"
              />
              <button className="bg-primary px-4 rounded-r-full">
                <IconSend className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
