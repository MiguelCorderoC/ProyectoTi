import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import usuarioReducer from "./usuarioSlice";
import formReducer from "./formSlice";
import incidenteReducer from "./incidenteSlice";
import problemaReducer from "./problemaSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    usuario: usuarioReducer,
    form: formReducer,
    incidente: incidenteReducer,
    problema: problemaReducer,
  },
});
