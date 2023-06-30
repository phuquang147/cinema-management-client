import Axios from "axios";
import { URL_GET_SNACKS } from "./apiUrls";

const SnackServices = {
  getSnacks: () => {
    return Axios({
      url: URL_GET_SNACKS,
      method: "GET",
    });
  },
};

export default SnackServices;
