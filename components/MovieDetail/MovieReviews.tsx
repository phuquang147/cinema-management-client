import Review from "./Review";

type MovieReviewsProps = {};

const MovieReviews: React.FC<MovieReviewsProps> = () => {
  return (
    <div className="flex flex-col gap-8">
      <Review />
      <Review />
    </div>
  );
};
export default MovieReviews;
