import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CgClose } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { changeMostrarForm } from "../../redux/formSlice";

function ProblemaCreate() {
  const { register, handleSubmit } = useForm();
  const [tecnicos, setTecnicos] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const dispatch = useDispatch();

  const obtenerTecnicos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/tecnicos");
      setTecnicos(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener tecnicos");
    }
  };

  const obtenerEquipos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/equipos");
      setEquipos(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener equipos");
    }
  };

  const onSubmit = async (data) => {
    const { nombre, descripcion, id_tecnico, id_equipo } = data;
    try {
      axios.post("http://localhost:3000/api/problemas", {
        nombre,
        descripcion,
        id_tecnico,
        id_equipo,
      });
      toast.success("Problema registrado");
    } catch (error) {
      console.error(error);
      toast.error("Error al registrar problema");
    }
  };

  useEffect(() => {
    obtenerEquipos();
    obtenerTecnicos();
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="fixed p-2 space-y-2 bg-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded border shadow w-full max-w-md font-semibold text-sm"
      >
        <article className="flex justify-between items-start">
          <h2 className="text-2xl">Nuevo problema</h2>
          <button
            type="button"
            onClick={() => {
              dispatch(changeMostrarForm(false));
            }}
            className="bg-red-600 rounded-full p-1 mt-1 mr-1"
          >
            <CgClose className="text-white text-lg" />
          </button>
        </article>
        <article>
          <label>Nombre</label>
          <input
            {...register("nombre")}
            type="text"
            className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
          />
        </article>
        <article>
          <label>Descripcion</label>
          <textarea
            {...register("descripcion")}
            type="text"
            className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
          />
        </article>
        <article>
          <label>Equipo</label>
          <select
            {...register("id_equipo")}
            className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
          >
            {equipos.map((item, i) => (
              <option key={i} value={item.equipo_id}>
                {item.equipo_nombre}
              </option>
            ))}
          </select>
        </article>
        <article>
          <label>Tecnico</label>
          <select
            {...register("id_tecnico")}
            className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
          >
            {tecnicos.map((item, i) => (
              <option key={i} value={item.usuario_id}>
                {item.usuario_nombre}
              </option>
            ))}
          </select>
        </article>
        <button className="bg-gray-800 w-full text-gray-200 rounded p-2 hover:bg-gray-900 transition duration-300">
          Registrar problema
        </button>
      </form>
    </>
  );
}
export default ProblemaCreate;
