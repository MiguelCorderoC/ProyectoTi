import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  titulo: "",
  descripcion: "",
  inicio: "",
  usuario: "",
  equipo: "",
  departamento: "",
  marca: "",
  modelo: "",
  adquisicion: "",
  cubiculo: "",
};

export const incidenteSlice = createSlice({
  name: "incidente",
  initialState,
  reducers: {
    addIncidente: (state, action) => {
      const {
        id,
        titulo,
        descripcion,
        inicio,
        usuario,
        equipo,
        departamento,
        marca,
        modelo,
        adquisicion,
        cubiculo,
      } = action.payload;

      state.id = id;
      state.titulo = titulo;
      state.descripcion = descripcion;
      state.inicio = inicio;
      state.usuario = usuario;
      state.equipo = equipo;
      state.departamento = departamento;
      state.marca = marca;
      state.modelo = modelo;
      state.adquisicion = adquisicion;
      state.cubiculo = cubiculo;
    },
    changeId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { addIncidente, changeId } = incidenteSlice.actions;
export default incidenteSlice.reducer;
