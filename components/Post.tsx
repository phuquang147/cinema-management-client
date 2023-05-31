import { IconEye } from "@tabler/icons";
import Image from "next/image";
import Link from "next/link";
import Post from "~/interfaces/post.interface";

interface PostProps {
  post: Post;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div className="w-full h-44 rounded overflow-hidden flex">
      <Link href={`/bai-viet/${post.slug}`}>
        <div className="group rounded relative w-44 h-full mb-2 overflow-hidden">
          <Image
            src={post.thumbnail}
            alt=""
            fill
            objectFit="cover"
            className="rounded group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      </Link>
      <div className="flex-1 flex flex-col items-start px-4 text-gray-text dark:text-light-text">
        <Link
          href={`/bai-viet/${post.slug}`}
          className="w-full text-lg font-medium line-clamp-2 hover:text-primary"
        >
          {post.title}
        </Link>
        <div className="flex items-center gap-x-1 px-2 py-1 rounded text-xs text-gray-text dark:text-light-text mt-2 border-2 border-gray-500 dark:border-gray-400">
          <IconEye className="w-4 h-4" />
          {post.view}
        </div>
      </div>
    </div>
  );
};

export default Post;
