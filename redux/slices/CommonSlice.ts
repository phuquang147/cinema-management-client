import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CommonServices from "~/services/commonServices";
import showToast from "~/utils/showToast";

interface CommonState {
  nations: string[];
}

const initialState: CommonState = {
  nations: [],
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setNations: (state, action) => {
      return {
        ...state,
        nations: action.payload,
      };
    },
  },
});

export const getNations = createAsyncThunk(
  "common/getNations",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;

    try {
      const { data, status } = await CommonServices.getNations();

      if (status === 200) {
        dispatch(setNations(data.nations));
      }
    } catch (error: any) {
      showToast("error", error.response.data.message);
    }
  }
);

export const { setNations } = commonSlice.actions;

export default commonSlice.reducer;
