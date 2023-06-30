import { IconCalendar, IconEye } from "@tabler/icons";
import Image from "next/image";
import Link from "next/link";
import Post from "~/interfaces/post.interface";
import { ISOToDateFormat } from "~/utils/formatDateTime";

interface PostProps {
  post: Post;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div className="w-full p-6 rounded-xl overflow-hidden flex flex-col gap-2 bg-white dark:bg-dark-bg-secondary">
      <Link href={`/bai-viet/${post.slug}`}>
        <div className="group rounded relative w-full aspect-[5/3] mb-2 overflow-hidden">
          <Image
            src={post.thumbnail}
            alt=""
            fill
            objectFit="cover"
            className="rounded-lg group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="flex-1 flex flex-col gap-2 items-start text-gray-text dark:text-light-text">
        <Link
          href={`/bai-viet/${post.slug}`}
          className="w-full line-clamp-2 hover:text-primary font-bold"
        >
          {post.title}
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <IconCalendar className="h-5 w-5" />
            <p className="text-gray-text dark:text-light-text text-sm leading-[14px]">
              {ISOToDateFormat(post.createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <IconEye className="h-5 w-5" />
            <p className="text-gray-text dark:text-light-text text-sm leading-[14px]">
              {post.view}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
