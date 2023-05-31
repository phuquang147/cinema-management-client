import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Movie from "~/interfaces/movie.interface";
import MovieServices from "~/services/movieServices";
import showToast from "~/utils/showToast";

interface MovieState {
  movies: Movie[];
}

const initialState: MovieState = {
  movies: [],
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      return {
        ...state,
        movies: action.payload,
      };
    },
  },
});

export const getMovies = createAsyncThunk(
  "movie/getMovies",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;

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

export const { setMovies } = movieSlice.actions;

export default movieSlice.reducer;
