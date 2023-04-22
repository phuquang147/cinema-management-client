import Axios from "axios";
import { RegisterFormData } from "~/pages/dang-ky";
import { LoginFormData } from "~/pages/dang-nhap";
import { ResetPasswordFormData } from "~/pages/quen-mat-khau";
import { ChangePasswordFormData } from "~/pages/quen-mat-khau/[passwordToken]/[accountId]";
import {
  URL_FORGOT_PASSWORD,
  URL_LOGIN,
  URL_RESET_PASSWORD,
  URL_SIGN_UP,
} from "./apiUrls";

const AuthServices = {
  signUp: (data: RegisterFormData) => {
    return Axios({
      url: URL_SIGN_UP,
      method: "POST",
      data,
    });
  },
  login: (data: LoginFormData) => {
    return Axios({
      url: URL_LOGIN,
      method: "POST",
      data,
    });
  },
  resetPassword: (data: ResetPasswordFormData) => {
    return Axios({
      url: URL_FORGOT_PASSWORD,
      method: "POST",
      data,
    });
  },
  changePassword: (data: ChangePasswordFormData) => {
    return Axios({
      url: URL_RESET_PASSWORD,
      method: "POST",
      data,
    });
  },
};

export default AuthServices;
