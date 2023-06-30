import Axios from "axios";
import Cookies from "js-cookie";
import { TransactionData } from "~/components/Booking/Payment";
import { URL_CREATE_TRANSACTION, URL_GET_TRANSACTIONS } from "./apiUrls";

const TransactionServices = {
  getTransactions: () => {
    return Axios({
      url: URL_GET_TRANSACTIONS,
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },
  createTransaction: (data: { transaction: TransactionData; jwt: string }) => {
    const { transaction, jwt } = data;
    return Axios({
      url: URL_CREATE_TRANSACTION,
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      data: transaction,
    });
  },
};

export default TransactionServices;
