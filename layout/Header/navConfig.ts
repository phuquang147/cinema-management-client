export type NavItemConfigProps = {
  name: string;
  link?: string;
  children?: { name: string; link: string }[];
};

const navConfig: NavItemConfigProps[] = [
  { name: "Trang chủ", link: "/" },
  { name: "Lịch chiếu", link: "/lich-chieu" },
  {
    name: "Phim",
    link: "/phim",
    // children: [
    //   {
    //     name: "Phim đang chiếu",
    //     link: "/phim",
    //   },
    //   {
    //     name: "Phim sắp chiếu",
    //     link: "/phim",
    //   },
    // ],
  },
  {
    name: "Blog",
    link: "/bai-viet",
  },
];

export default navConfig;