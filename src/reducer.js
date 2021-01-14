import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
  name: "formData",
  initialState: {
    name: "",
    email: "",
  },
  reducers: {
    addEmail(state, action) {
      state.email = action.payload;
    },
    addName(state, action) {
      state.name = action.payload;
    },
  },
});

export const { addEmail, addName } = rootSlice.actions;

export default rootSlice.reducer;
