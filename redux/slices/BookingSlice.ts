import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TransactionData } from "~/components/Booking/Payment";
import IShowTime from "~/interfaces/showTime.interface";
import ISnack from "~/interfaces/snack.interface";
import { ITicket } from "~/interfaces/ticket.interface";
import TransactionServices from "~/services/transactionServices";
import showToast from "~/utils/showToast";
import Cookies from "js-cookie";
export interface IExtendedSnack extends ISnack {
  count: number;
}

interface BookingState {
  showTime: IShowTime | null;
  tickets: ITicket[];
  snacks: IExtendedSnack[];
}

const initialState: BookingState = {
  showTime: null,
  tickets: [],
  snacks: [],
};

export const userSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    selectShowTime: (state, action) => {
      return {
        ...state,
        showTime: action.payload,
      };
    },
    selectTickets: (state, action) => {
      return {
        ...state,
        tickets: action.payload,
      };
    },
    setSnacks: (state, action) => {
      return {
        ...state,
        snacks: action.payload.map((snack: ISnack) => ({ ...snack, count: 0 })),
      };
    },
    increaseSnackQuantity: (state, action) => {
      const snack = action.payload;
      const snacks = [...state.snacks];
      const index = snacks.findIndex((s) => s._id === snack._id);

      if (index > -1)
        snacks[index] = { ...snacks[index], count: snacks[index].count + 1 };

      return {
        ...state,
        snacks,
      };
    },
    decreaseSnackQuantity: (state, action) => {
      const snack = action.payload;
      let snacks = [...state.snacks];
      const index = snacks.findIndex((s) => s._id === snack._id);

      if (index > -1)
        snacks[index] = { ...snacks[index], count: snacks[index].count - 1 };

      return {
        ...state,
        snacks,
      };
    },
    resetData: () => {
      return {
        showTime: null,
        snacks: [],
        tickets: [],
      };
    },
  },
});

export const createTransaction = createAsyncThunk(
  "booking/createTransaction",
  async (
    payload: {
      transaction: TransactionData;
      jwt: string;
    },
    thunkApi
  ) => {
    const { transaction, jwt } = payload;

    try {
      const { data, status } = await TransactionServices.createTransaction({
        transaction,
        jwt,
      });

      if (status === 201) {
        showToast("success", data.message);
      }
    } catch (error: any) {
      showToast("error", error.response.data.message);
    }
  }
);

export const {
  selectShowTime,
  increaseSnackQuantity,
  decreaseSnackQuantity,
  selectTickets,
  resetData,
  setSnacks,
} = userSlice.actions;

export default userSlice.reducer;
