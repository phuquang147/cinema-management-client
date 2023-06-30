import { IconStar } from "@tabler/icons";
import Image from "next/image";

type ReviewProps = {};

const Review: React.FC<ReviewProps> = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex gap-4 ">
          <div className="relative h-12 w-12 rounded-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80"
              alt=""
              fill
              objectFit="cover"
            />
          </div>
          <div>
            <p className="dark:text-light-text font-bold">User</p>
            <p className="dark:text-light-text text-sm">24.08.2018, 17:53</p>
          </div>
        </div>
        <div className="flex items-center">
          <IconStar className="h-4 w-4 text-primary" />
          <span className="dark:text-gray-200 ml-1 font-bold text-sm">5.5</span>
        </div>
      </div>
      <p className="bg-light-gray-bg dark:bg-dark-bg-secondary text-gray-text dark:text-light-text p-4 rounded">
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form, by injected humour, or
        randomised words which dont look even slightly believable. If you are
        going to use a passage of Lorem Ipsum, you need to be sure there isnt
        anything embarrassing hidden in the middle of text.
      </p>
    </div>
  );
};
export default Review;
