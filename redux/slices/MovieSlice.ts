import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { UseFormReset } from "react-hook-form";
import { CommentFormData } from "~/components/MovieDetail/MovieComments";
import {
  IComment,
  default as IMovie,
  default as Movie,
} from "~/interfaces/movie.interface";
import MovieServices from "~/services/movieServices";
import showToast from "~/utils/showToast";

interface MovieState {
  movies: Movie[];
  showingMovies: Movie[];
  incomingMovies: Movie[];
  movieGenres: string[];
  movieYears: string[];
  filteredMovies: Movie[];
}

const initialState: MovieState = {
  movies: [],
  showingMovies: [],
  incomingMovies: [],
  movieGenres: [],
  movieYears: [],
  filteredMovies: [],
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setShowingMovies: (state, action) => {
      return {
        ...state,
        showingMovies: action.payload,
      };
    },
    setIncomingMovies: (state, action) => {
      return {
        ...state,
        incomingMovies: action.payload,
      };
    },
    setMovies: (state, action) => {
      return {
        ...state,
        movies: action.payload,
        movieGenres: action.payload.reduce(
          (genres: string[], currentMovie: IMovie) => {
            return _.union(
              genres,
              currentMovie.genres.map((genre) => genre.name)
            );
          },
          []
        ),
        movieYears: action.payload.reduce(
          (years: string[], currentMovie: IMovie) => {
            return _.union(years, [currentMovie.premiereDay.slice(0, 4)]);
          },
          []
        ),
        filteredMovies: action.payload,
      };
    },
    applyFilter: (state, action) => {
      let filteredMovies = [...state.movies];
      if (action.payload.genre !== "Tất cả")
        filteredMovies = filteredMovies.filter((movie) => {
          return movie.genres
            .map((genre) => genre.name)
            .includes(action.payload.genre);
        });

      return {
        ...state,
        filteredMovies: [...filteredMovies],
      };
    },
  },
});

export const getMovies = createAsyncThunk(
  "movie/getMovies",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(setMovies([]));

    try {
      const { data, status } = await MovieServices.getMovies();

      if (status === 200) {
        dispatch(setMovies(data.movies));
      }
    } catch (error: any) {
      showToast("error", error.response.data.message);
    }
  }
);

export const getShowingMovies = createAsyncThunk(
  "movie/getShowingMovies",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(setShowingMovies([]));

    try {
      const { data, status } = await MovieServices.getShowingMovies();

      if (status === 200) {
        dispatch(setShowingMovies(data.movies));
      }
    } catch (error: any) {
      showToast("error", error.response.data.message);
    }
  }
);

export const getIncomingMovies = createAsyncThunk(
  "movie/getIncomingMovies",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(setIncomingMovies([]));

    try {
      const { data, status } = await MovieServices.getIncomingMovies();

      if (status === 200) {
        dispatch(setIncomingMovies(data.movies));
      }
    } catch (error: any) {
      showToast("error", error.response.data.message);
    }
  }
);

export const reactComment = createAsyncThunk(
  "movie/reactComment",
  async (
    payload: {
      react: { action: string; movie: string; comment: string };
      jwt: string;
      handleUpdateComments: (comments: IComment[]) => void;
    },
    thunkApi
  ) => {
    const { react, jwt, handleUpdateComments } = payload;

    try {
      const { data, status } = await MovieServices.reactComment({
        ...react,
        jwt,
      });

      if (status === 200) {
        handleUpdateComments(data.comments);
      }
    } catch (error: any) {
      showToast("error", error.response.data.message);
    }
  }
);

export const createComment = createAsyncThunk(
  "movie/createComment",
  async (
    payload: {
      comment: CommentFormData;
      jwt: string;
      reset: UseFormReset<CommentFormData>;
      handleUpdateComments: (comments: IComment[]) => void;
    },
    thunkApi
  ) => {
    const { comment, jwt, reset, handleUpdateComments } = payload;

    try {
      const { data, status } = await MovieServices.createComment({
        comment,
        jwt,
      });

      if (status === 201) {
        reset();
        showToast("success", data.message);
        handleUpdateComments(data.comments);
      }
    } catch (error: any) {
      showToast("error", error.response.data.message);
    }
  }
);

export const updateComment = createAsyncThunk(
  "movie/updateComment",
  async (
    payload: {
      comment: CommentFormData;
      commentId: string;
      jwt: string;
      handleUpdateComments: (comments: IComment[]) => void;
    },
    thunkApi
  ) => {
    const { comment, commentId, jwt, handleUpdateComments } = payload;

    try {
      const { data, status } = await MovieServices.updateComment({
        commentId,
        jwt,
        comment,
      });

      if (status === 200) {
        showToast("success", data.message);
        handleUpdateComments(data.comments);
      }
    } catch (error: any) {
      showToast("error", error.response.data.message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "movie/deleteComment",
  async (
    payload: {
      commentId: string;
      jwt: string;
      parentComment: string | null;
      movie: string;
      handleUpdateComments: (comments: IComment[]) => void;
    },
    thunkApi
  ) => {
    const { commentId, jwt, parentComment, movie, handleUpdateComments } =
      payload;

    try {
      const { data, status } = await MovieServices.deleteComment({
        commentId,
        jwt,
        parentComment,
        movie,
      });

      if (status === 200) {
        showToast("success", data.message);
        handleUpdateComments(data.comments);
      }
    } catch (error: any) {
      showToast("error", error.response.data.message);
    }
  }
);

export const { setMovies, setShowingMovies, setIncomingMovies, applyFilter } =
  movieSlice.actions;

export default movieSlice.reducer;
