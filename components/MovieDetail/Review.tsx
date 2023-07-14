import { IconStar } from "@tabler/icons";
import Image from "next/image";
import { IReview } from "~/interfaces/movie.interface";
import { ISOToDateTimeFormat } from "~/utils/formatDateTime";
import { printNumberWithCommas } from "~/utils/printNumerWithCommas";

type ReviewProps = {
  review: IReview;
};

const Review: React.FC<ReviewProps> = ({ review }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex gap-4 ">
          <div className="relative h-12 w-12 rounded-full overflow-hidden">
            <Image
              src="/assets/images/user.png"
              alt=""
              fill
              objectFit="cover"
            />
          </div>
          <div>
            <p className="dark:text-light-text font-bold">
              {review.reviewer.name}
            </p>
            <p className="dark:text-light-text text-sm">
              {ISOToDateTimeFormat(review.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <IconStar className="h-4 w-4 text-primary" />
          <span className="dark:text-gray-200 ml-1 font-bold text-sm">
            {printNumberWithCommas(review.score)}
          </span>
        </div>
      </div>
      <p className="bg-light-gray-bg dark:bg-dark-bg-secondary text-gray-text dark:text-light-text p-4 rounded-lg">
        {review.description}
      </p>
    </div>
  );
};
export default Review;
