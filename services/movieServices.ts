import Axios from "axios";
import { URL_GET_MOVIES, URL_GET_MOVIE_BY_SLUG } from "./apiUrls";

const MovieServices = {
  getMovies: () => {
    return Axios({
      url: URL_GET_MOVIES,
      method: "GET",
    });
  },
  getMovieBySlug: (slug: string) => {
    return Axios({
      url: URL_GET_MOVIE_BY_SLUG(slug),
      method: "GET",
    });
  },
};

export default MovieServices;
