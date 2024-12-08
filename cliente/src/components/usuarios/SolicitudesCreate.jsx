import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { changeMostrarForm } from "../../redux/formSlice";

function SolicitudesCreate() {
  const dispatch = useDispatch();
  const [equipos, setEquipos] = useState([]);
  const { register, handleSubmit } = useForm();
  const userStore = useSelector((state) => state.user);

  const obtenerEquipos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/equipos");
      setEquipos(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Error al obtener equipos");
    }
  };

  const onSubmit = async (data) => {
    const { nombre, descripcion, equipo_id } = data;
    try {
      await axios.post("http://localhost:3000/api/incidentes", {
        nombre,
        descripcion,
        usuario_id: userStore.id,
        equipo_id,
      });
      toast.success("Solicitud registrada");
    } catch (error) {
      console.error(error);
      toast.error("Error al registrar solicitud");
    }
  };

  useEffect(() => {
    obtenerEquipos();
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="fixed p-2 space-y-2 bg-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded border shadow w-full max-w-md font-semibold text-sm"
      >
        <article className="flex justify-between items-start">
          <h2 className="text-2xl">Registrar solicitud</h2>
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
          <label>Equipo</label>
          <select
            {...register("equipo_id")}
            className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
          >
            {equipos.map((item, i) => (
              <option key={i} value={item.equipo_id}>
                {item.equipo_nombre}
              </option>
            ))}
          </select>
        </article>
        <article className="w-full">
          <label>Titulo</label>
          <input
            {...register("nombre")}
            type="text"
            className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
          />
        </article>
        <article className="w-full">
          <label>Descripcion</label>
          <textarea
            {...register("descripcion")}
            type="text"
            className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
          />
        </article>
        <button className="bg-gray-800 w-full text-gray-200 rounded p-2 hover:bg-gray-900 transition duration-300">
          Registrar equipo
        </button>
      </form>
    </>
  );
}
export default SolicitudesCreate;
