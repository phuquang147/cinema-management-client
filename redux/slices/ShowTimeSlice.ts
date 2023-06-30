import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import IShowTime from "~/interfaces/showTime.interface";
import ShowTimeServices from "~/services/showTimeServices";
import showToast from "~/utils/showToast";

interface ShowTimeState {
  showTimes: IShowTime[];
}

const initialState: ShowTimeState = {
  showTimes: [],
};

export const showTimeSlice = createSlice({
  name: "showTime",
  initialState,
  reducers: {
    setShowTimes: (state, action) => {
      return {
        ...state,
        showTimes: action.payload,
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
