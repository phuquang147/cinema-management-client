import Axios from "axios";
import { CommentFormData } from "~/components/MovieDetail/MovieComments";
import {
  URL_CREATE_COMMENT,
  URL_DELETE_COMMENT,
  URL_GET_INCOMING_MOVIES,
  URL_GET_MOVIES,
  URL_GET_MOVIE_BY_SLUG,
  URL_GET_SHOWING_MOVIES,
  URL_REACT_COMMENT,
  URL_UPDATE_COMMENT,
} from "./apiUrls";

const MovieServices = {
  getMovies: () => {
    return Axios({
      url: URL_GET_MOVIES,
      method: "GET",
    });
  },
  getIncomingMovies: () => {
    return Axios({
      url: URL_GET_INCOMING_MOVIES,
      method: "GET",
    });
  },
  getShowingMovies: () => {
    return Axios({
      url: URL_GET_SHOWING_MOVIES,
      method: "GET",
    });
  },
  getMovieBySlug: (slug: string) => {
    return Axios({
      url: URL_GET_MOVIE_BY_SLUG(slug),
      method: "GET",
    });
  },
  createComment: (data: { comment: CommentFormData; jwt: string }) => {
    return Axios({
      url: URL_CREATE_COMMENT,
      method: "POST",
      headers: {
        Authorization: `Bearer ${data.jwt}`,
      },
      data: data.comment,
    });
  },
  updateComment: (data: {
    comment: CommentFormData;
    commentId: string;
    jwt: string;
  }) => {
    const { comment, commentId, jwt } = data;
    return Axios({
      url: URL_UPDATE_COMMENT(commentId),
      method: "PUT",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      data: comment,
    });
  },
  reactComment: (data: {
    action: string;
    movie: string;
    comment: string;
    jwt: string;
  }) => {
    const { action, movie, comment, jwt } = data;

    return Axios({
      url: URL_REACT_COMMENT(comment),
      method: "PUT",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      data: { action, movie },
    });
  },

  deleteComment: (data: {
    commentId: string;
    jwt: string;
    parentComment: string | null;
    movie: string;
  }) => {
    const { commentId, jwt, parentComment, movie } = data;

    return Axios({
      url: URL_DELETE_COMMENT(commentId),
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      data: { parentComment, movie },
    });
  },
};

export default MovieServices;
