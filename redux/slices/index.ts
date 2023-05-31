import ActorSlice from "./ActorSlice";
import AuthSlice from "./AuthSlice";
import BookingSlice from "./BookingSlice";
import MovieSlice from "./MovieSlice";
import PostSlice from "./PostSlice";
import ShowTimeSlice from "./ShowTimeSlice";
import SnackSlice from "./SnackSlice";
import TransactionSlice from "./TransactionSlice";

const rootReducer = {
  auth: AuthSlice,
  movie: MovieSlice,
  post: PostSlice,
  actor: ActorSlice,
  snack: SnackSlice,
  showTime: ShowTimeSlice,
  booking: BookingSlice,
  transaction: TransactionSlice,
};

export default rootReducer;
