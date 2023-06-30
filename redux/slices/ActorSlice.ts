import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Actor from "~/interfaces/actor.interface";
import ActorServices from "~/services/actorServices";
import showToast from "~/utils/showToast";

interface ActorState {
  actors: Actor[];
  filteredActors: Actor[];
}

const initialState: ActorState = {
  actors: [],
  filteredActors: [],
};

export const actorSlice = createSlice({
  name: "actor",
  initialState,
  reducers: {
    setActors: (state, action) => {
      return {
        ...state,
        actors: action.payload,
        filteredActors: action.payload,
      };
    },
    applyFilter: (state, action) => {
      if (action.payload === "Tất cả")
        return {
          ...state,
          filteredActors: state.actors,
        };
      else
        return {
          ...state,
          filteredActors: state.actors.filter(
            (actor) => actor.nation === action.payload
          ),
        };
    },
  },
});

export const getActors = createAsyncThunk(
  "actor/getActors",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;

    try {
      const { data, status } = await ActorServices.getActors();

      if (status === 200) {
        dispatch(setActors(data.actors));
      }
    } catch (error: any) {
      showToast("error", error.response.data.message);
    }
  }
);

export const { setActors, applyFilter } = actorSlice.actions;

export default actorSlice.reducer;
