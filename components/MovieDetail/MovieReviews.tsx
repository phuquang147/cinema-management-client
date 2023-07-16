import { useState } from "react";
import { IReview } from "~/interfaces/movie.interface";
import Paginator from "../UI/Paginator";
import Review from "./Review";

type MovieReviewsProps = {
  reviews: IReview[];
};

const MovieReviews: React.FC<MovieReviewsProps> = ({ reviews }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const currentItems = reviews.slice(currentPage * 5 - 5, currentPage * 5);

  const handleChangePage = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  return (
    <div>
      <div className="flex flex-col gap-8 pb-10">
        {currentItems.map((review) => (
          <Review key={review._id} review={review} />
        ))}
      </div>
      <Paginator
        itemCount={reviews.length}
        currentPage={currentPage}
        onChangePage={handleChangePage}
        itemsPerPage={5}
      />
    </div>
  );
};
export default MovieReviews;
