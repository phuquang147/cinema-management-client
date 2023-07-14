import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import IShowTime from "~/interfaces/showTime.interface";
import ShowTimeServices from "~/services/showTimeServices";
import showToast from "~/utils/showToast";
import _ from "lodash";

export type MappedShowTime = {
  name: string;
  thumbnail: string;
  showTimes: IShowTime[];
};

interface ShowTimeState {
  showTimes: IShowTime[];
  mappedShowTimes: MappedShowTime[];
}

const initialState: ShowTimeState = {
  showTimes: [],
  mappedShowTimes: [],
};

export const showTimeSlice = createSlice({
  name: "showTime",
  initialState,
  reducers: {
    setShowTimes: (state, action) => {
      const grouppedShowTimesByMovie = _.groupBy(
        action.payload,
        (showTime) => showTime.movie.name
      );

      const mappedShowTimes = _.values(
        _.mapValues(grouppedShowTimesByMovie, (showTimesByMovie) => ({
          name: showTimesByMovie[0].movie.name,
          thumbnail: showTimesByMovie[0].movie.thumbnail,
          showTimes: showTimesByMovie,
        }))
      );

      console.log(mappedShowTimes);

      return {
        ...state,
        showTimes: action.payload,
        mappedShowTimes,
      };
    },
  },
});

export const getShowTimesByDate = createAsyncThunk(
  "showTime/getShowTimesByDate",
  async (payload: { date: string }, thunkApi) => {
    const { dispatch } = thunkApi;
    const { date } = payload;

    try {
      const { data, status } = await ShowTimeServices.getShowTimesByDate(date);

      if (status === 200) {
        dispatch(setShowTimes(data.showTimes));
      }
    } catch (error: any) {
      showToast("error", error.response.data.message);
    }
  }
);

export const { setShowTimes } = showTimeSlice.actions;

export default showTimeSlice.reducer;
