import Axios from "axios";
import { TransactionData } from "~/components/Booking/Payment";
import { RatingFormData } from "~/pages/chi-tiet-giao-dich/[transactionId]";
import {
  URL_CREATE_RATING,
  URL_CREATE_TRANSACTION,
  URL_DELETE_RATING,
  URL_GET_TRANSACTIONS,
  URL_GET_TRANSACTION_BY_ID,
  URL_UPDATE_RATING,
} from "./apiUrls";

const TransactionServices = {
  getTransactions: (jwt: string) => {
    return Axios({
      url: URL_GET_TRANSACTIONS,
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  },
  getTransactionById: (data: { id: string; jwt: string }) => {
    const { id, jwt } = data;

    return Axios({
      url: URL_GET_TRANSACTION_BY_ID(id),
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
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
  createRating: (data: { rating: RatingFormData; jwt: string }) => {
    console.log(data.rating);

    return Axios({
      url: URL_CREATE_RATING,
      method: "POST",
      headers: {
        Authorization: `Bearer ${data.jwt}`,
      },
      data: data.rating,
    });
  },
  updateRating: (data: {
    ratingId: string;
    rating: RatingFormData;
    jwt: string;
  }) => {
    return Axios({
      url: URL_UPDATE_RATING(data.ratingId),
      method: "PUT",
      headers: {
        Authorization: `Bearer ${data.jwt}`,
      },
      data: data.rating,
    });
  },
  deleteRating: (data: { ratingId: string; jwt: string; movie: string }) => {
    return Axios({
      url: URL_DELETE_RATING(data.ratingId),
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${data.jwt}`,
      },
      data: {
        movie: data.movie,
      },
    });
  },
};

export default TransactionServices;
