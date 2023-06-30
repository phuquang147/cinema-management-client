import Axios from "axios";
import { URL_GET_NATIONS } from "./apiUrls";

const CommonServices = {
  getNations: () => {
    return Axios({
      url: URL_GET_NATIONS,
      method: "GET",
    });
  },
};

export default CommonServices;
