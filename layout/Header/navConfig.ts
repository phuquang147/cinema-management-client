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
  },
  {
    name: "Góc điện ảnh",
    children: [
      {
        name: "Thể loại phim",
        link: "/the-loai-phim",
      },
      {
        name: "Diễn viên",
        link: "/dien-vien",
      },
      {
        name: "Bài viết",
        link: "/bai-viet",
      },
    ],
  },
];

export default navConfig;
