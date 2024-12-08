import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
};

export const usuarioSlice = createSlice({
  name: "usuario",
  initialState,
  reducers: {
    addUsuario: (state, action) => {
      const { visible } = action.payload;
      state.visible = visible;
    },
    changeMostrarUsuario: (state, action) => {
      state.visible = action.payload;
    },
  },
});

export const { addUsuario, changeMostrarUsuario } = usuarioSlice.actions;
export default usuarioSlice.reducer;
