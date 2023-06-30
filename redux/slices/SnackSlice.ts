import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Snack from "~/interfaces/snack.interface";
import SnackServices from "~/services/snackServices";
import showToast from "~/utils/showToast";

interface SnackState {
  snacks: Snack[];
}

const initialState: SnackState = {
  snacks: [],
};

export const snackSlice = createSlice({
  name: "snack",
  initialState,
  reducers: {
    setSnacks: (state, action) => {
      return {
        ...state,
        snacks: action.payload,
      };
    },
  },
});

export const getSnacks = createAsyncThunk(
  "snack/getSnacks",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;

    try {
      const { data, status } = await SnackServices.getSnacks();

      if (status === 200) {
        dispatch(setSnacks(data.items));
      }
    } catch (error: any) {
      showToast("error", error.response.data.message);
    }
  }
);

export const { setSnacks } = snackSlice.actions;

export default snackSlice.reducer;
