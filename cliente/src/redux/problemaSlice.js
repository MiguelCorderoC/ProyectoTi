import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  problema: "",
  descripcion: "",
  marca: "",
  modelo: "",
  equipo: "",
  tecnico: "",
  adquisicion: "",
  edificio: "",
  departamento: "",
  equipo_id: "",
};

export const problemaSlice = createSlice({
  name: "problema",
  initialState,
  reducers: {
    addProblema: (state, action) => {
      const {
        id,
        problema,
        descripcion,
        equipo,
        marca,
        modelo,
        tecnico,
        adquisicion,
        edificio,
        departamento,
        equipo_id,
      } = action.payload;
      state.id = id;
      state.problema = problema;
      state.descripcion = descripcion;
      state.equipo = equipo;
      state.marca = marca;
      state.modelo = modelo;
      state.tecnico = tecnico;
      state.adquisicion = adquisicion;
      state.edificio = edificio;
      state.departamento = departamento;
      state.equipo_id = equipo_id;
    },
  },
});

export const { addProblema } = problemaSlice.actions;
export default problemaSlice.reducer;
