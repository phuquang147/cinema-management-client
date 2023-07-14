import { IReview } from "~/interfaces/movie.interface";
import Review from "./Review";

type MovieReviewsProps = {
  reviews: IReview[];
};

const MovieReviews: React.FC<MovieReviewsProps> = ({ reviews }) => {
  return (
    <div className="flex flex-col gap-8">
      {reviews.map((review) => (
        <Review key={review._id} review={review} />
      ))}
    </div>
  );
};
export default MovieReviews;
