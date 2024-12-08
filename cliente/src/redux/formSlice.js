import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addForm: (state, action) => {
      const { visible } = action.payload;
      state.visible = visible;
    },
    changeMostrarForm: (state, action) => {
      state.visible = action.payload;
    },
  },
});

export const { addForm, changeMostrarForm } = formSlice.actions;
export default formSlice.reducer;
