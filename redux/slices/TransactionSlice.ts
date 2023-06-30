import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TransactionData } from "~/components/Booking/Payment";
import ITransaction from "~/interfaces/transaction.interface";
import TransactionServices from "~/services/transactionServices";
import showToast from "~/utils/showToast";
import { resetData } from "./BookingSlice";

interface TransactionState {
  transactions: ITransaction[];
}

const initialState: TransactionState = {
  transactions: [],
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
  },
});

export const getTransactions = createAsyncThunk(
  "transaction/getTransactions",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;

    try {
      const { data, status } = await TransactionServices.getTransactions();

      if (status === 200) {
        dispatch(setTransactions(data.movies));
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

export const { setTransactions } = transactionSlice.actions;

export default transactionSlice.reducer;
