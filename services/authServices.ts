import Axios from "axios";
import { LoginFormData } from "~/pages/dang-nhap";
import {
  URL_FORGOT_PASSWORD,
  URL_LOGIN,
  URL_RESET_PASSWORD,
  URL_SIGN_UP,
} from "./apiUrls";

const AuthServices = {
  // signUp: (data: any) => {
  //   return Axios({
  //     url: URL_SIGN_UP,
  //     method: "POST",
  //     data,
  //   });
  // },
  login: (data: LoginFormData) => {
    return Axios({
      url: URL_LOGIN,
      method: "POST",
      data,
    });
  },
  // resetPassword: (data: any) => {
  //   return Axios({
  //     url: URL_FORGOT_PASSWORD,
  //     method: "POST",
  //     data,
  //   });
  // },
  // changePassword: (data: any) => {
  //   return Axios({
  //     url: URL_RESET_PASSWORD,
  //     method: "POST",
  //     data,
  //   });
  // },
};

export default AuthServices;
