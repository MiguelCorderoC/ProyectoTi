import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: "",
  id: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { role, id } = action.payload;
      state.role = role;
      state.id = id;
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
