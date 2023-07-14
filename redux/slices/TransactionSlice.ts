import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TransactionData } from "~/components/Booking/Payment";
import ITransaction from "~/interfaces/transaction.interface";
import { RatingFormData } from "~/pages/chi-tiet-giao-dich/[transactionId]";
import TransactionServices from "~/services/transactionServices";
import showToast from "~/utils/showToast";
import { resetData } from "./BookingSlice";

interface TransactionState {
  transactions: ITransaction[];
  transaction: ITransaction | undefined;
}

const initialState: TransactionState = {
  transactions: [],
  transaction: undefined,
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      return {
        ...state,
        transactions: action.payload,
      };
    },
    setTransaction: (state, action) => {
      return {
        ...state,
        transaction: action.payload,
      };
    },
  },
});

export const getTransactions = createAsyncThunk(
  "transaction/getTransactions",
  async (payload: { jwt: string }, thunkApi) => {
    const { dispatch } = thunkApi;
    const { jwt } = payload;

    try {
      const { data, status } = await TransactionServices.getTransactions(jwt);

      if (status === 200) {
        dispatch(setTransactions(data._transactions));
      }
    } catch (error: any) {
      showToast("error", error.response.data.message);
    }
  }
);

export const getTransactionById = createAsyncThunk(
  "transaction/getTransactionById",
  async (payload: { jwt: string; id: string }, thunkApi) => {
    const { dispatch } = thunkApi;
    const { jwt, id } = payload;

    try {
      const { data, status } = await TransactionServices.getTransactionById({
        jwt,
        id,
      });

      if (status === 200) {
        dispatch(setTransaction(data.transaction));
      }
    } catch (error: any) {
      showToast("error", error.response.data.message);
    }
  }
);

export const createTransaction = createAsyncThunk(
  "transaction/createTransaction",
  async (payload: { transaction: TransactionData; jwt: string }, thunkApi) => {
    const { dispatch } = thunkApi;
    const { transaction, jwt } = payload;

    try {
      const { data, status } = await TransactionServices.createTransaction({
        transaction,
        jwt,
      });

      if (status === 201) {
        showToast("success", data.message);
        dispatch(resetData());
      }
    } catch (error: any) {
      showToast("error", error.response.data.message);
    }
  }
);

export const createRating = createAsyncThunk(
  "transaction/createRating",
  async (
    payload: {
      rating: RatingFormData;
      jwt: string;
    },
    thunkApi
  ) => {
    const { dispatch } = thunkApi;
    try {
      const { data, status } = await TransactionServices.createRating(payload);

      if (status === 201) {
        showToast("success", data.message);
        dispatch(setTransaction(data.transaction));
      }
    } catch (error: any) {
      showToast("error", error.response.data.message);
    }
  }
);

export const updateRating = createAsyncThunk(
  "transaction/updateRating",
  async (
    payload: {
      rating: RatingFormData;
      ratingId: string;
      jwt: string;
    },
    thunkApi
  ) => {
    const { dispatch } = thunkApi;
    try {
      const { data, status } = await TransactionServices.updateRating(payload);

      if (status === 200) {
        showToast("success", data.message);
        dispatch(setTransaction(data.transaction));
      }
    } catch (error: any) {
      showToast("error", error.response.data.message);
    }
  }
);

export const deleteRating = createAsyncThunk(
  "transaction/deleteRating",
  async (
    payload: {
      ratingId: string;
      movie: string;
      jwt: string;
    },
    thunkApi
  ) => {
    const { dispatch } = thunkApi;
    try {
      const { data, status } = await TransactionServices.deleteRating(payload);

      if (status === 200) {
        showToast("success", data.message);
        dispatch(setTransaction(data.transaction));
      }
    } catch (error: any) {
      showToast("error", error.response.data.message);
    }
  }
);

export const { setTransactions, setTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
