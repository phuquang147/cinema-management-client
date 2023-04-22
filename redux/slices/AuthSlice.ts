import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { RegisterFormData } from "~/pages/dang-ky";
import { ResetPasswordFormData } from "~/pages/quen-mat-khau";
import { ChangePasswordFormData } from "~/pages/quen-mat-khau/[passwordToken]/[accountId]";
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
  "auth/signup",
  async (payload: RegisterFormData, thunkApi) => {
    try {
      const { data, status } = await AuthServices.signUp(payload);

      if (status === 201) {
        showToast("success", data.message);
      }
    } catch (error: any) {
      showToast("error", error.response.data.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (payload: {
    data: ResetPasswordFormData;
    router: AppRouterInstance;
  }) => {
    try {
      const { data, status } = await AuthServices.resetPassword(payload.data);

      if (status === 200) {
        showToast("success", data.message);
        payload.router.push("/dang-nhap");
      }
    } catch (error: any) {
      showToast("error", error.response.data.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (payload: {
    data: ChangePasswordFormData;
    router: AppRouterInstance;
  }) => {
    try {
      const { data, status } = await AuthServices.changePassword(payload.data);

      if (status === 200) {
        showToast("success", data.message);
        setTimeout(() => {
          payload.router.push("/dang-nhap");
        }, 2000);
      }
    } catch (error: any) {
      showToast("error", error.response.data.message);
    }
  }
);

export const {} = userSlice.actions;

export default userSlice.reducer;
