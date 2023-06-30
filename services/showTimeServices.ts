import Axios from "axios";
import Cookies from "js-cookie";
import { URL_GET_SHOW_TIMES_BY_DATE, URL_GET_SHOW_TIME_BY_ID } from "./apiUrls";

const ShowTimeServices = {
  getShowTimesByDate: (date: string) => {
    return Axios({
      url: URL_GET_SHOW_TIMES_BY_DATE(date),
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },
  getShowTimesById: (id: string) => {
    return Axios({
      url: URL_GET_SHOW_TIME_BY_ID(id),
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },
};

export default ShowTimeServices;
