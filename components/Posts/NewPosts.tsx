import { IconChevronRight } from "@tabler/icons";
import Link from "next/link";

const NewPosts: React.FC = () => {
  return (
    <div>
      <Link href="/bai-viet/a">
        <div className="flex flex-row bg-gray-700 px-4 py-2 rounded">
          <IconChevronRight className="text-primary mr-2" />
          <span className="line-clamp-1 text-gray-100 hover:text-primary">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga dicta
            itaque eum atque rem vitae quidem error, eveniet rerum aliquid eos
            in quos, id quam commodi aliquam distinctio nulla ullam.
          </span>
        </div>
      </Link>
    </div>
  );
};

export default NewPosts;
