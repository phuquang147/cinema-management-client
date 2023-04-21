import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RegisterFormData } from "~/pages/dang-ky";
import AuthServices from "~/services/authServices";
import showToast from "~/utils/showToast";

interface AuthState {}

const initialState: AuthState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const signUp = createAsyncThunk(
  "user/signup",
  async (payload: RegisterFormData, thunkApi) => {
    try {
      const { data, status } = await AuthServices.signUp(payload);

      if (status === 200) {
        showToast("success", data.message);
      }
    } catch (error: any) {
      showToast("error", error.response.data.message);
    }
  }
);

export const {} = userSlice.actions;

export default userSlice.reducer;
