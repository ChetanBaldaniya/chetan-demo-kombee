import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

export const Loading = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    loadingStart: () => {
        return true;
  },
    loadingStop: () => {
        return false;
  },}
});

export const { loadingStart,loadingStop } = Loading.actions;
export default Loading.reducer;