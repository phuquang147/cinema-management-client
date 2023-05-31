import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Post from "~/interfaces/post.interface";
import PostServices from "~/services/postServices";
import showToast from "~/utils/showToast";

interface PostState {
  posts: Post[];
}

const initialState: PostState = {
  posts: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      return {
        ...state,
        posts: action.payload,
      };
    },
  },
});

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;

    try {
      const { data, status } = await PostServices.getPosts();

      if (status === 200) {
        dispatch(setPosts(data.posts));
      }
    } catch (error: any) {
      showToast("error", error.response.data.message);
    }
  }
);

export const { setPosts } = postSlice.actions;

export default postSlice.reducer;
