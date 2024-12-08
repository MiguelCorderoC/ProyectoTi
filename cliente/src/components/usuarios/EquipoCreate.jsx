import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CgClose } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { changeMostrarForm } from "../../redux/formSlice";

function EquiposCreate() {
  const dispatch = useDispatch();
  const [cubiculos, setCubiculos] = useState([]);
  const { register, handleSubmit } = useForm();

  const obtenerCubiculos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/edificios");
      setCubiculos(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Error al obtener cubiculos");
    }
  };

  const onSubmit = async (data) => {
    const {
      nombre,
      marca,
      modelo,

      sistemaoperativo,
      capacidad,
      fecha_adquisicion,

      edificio_id,
    } = data;
    try {
      await axios.post("http://localhost:3000/api/equipos", {
        nombre,
        marca,
        modelo,
        sistemaoperativo,
        capacidad,
        fecha_adquisicion,
        edificio_id,
      });
      toast.success("Equipo registrado");
    } catch (error) {
      console.error(error);
      toast.error("Error al registrar equipo");
    }
  };

  useEffect(() => {
    obtenerCubiculos();
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="fixed p-2 space-y-2 bg-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded border shadow w-full max-w-md font-semibold text-sm"
      >
        <article className="flex justify-between items-start">
          <h2 className="text-2xl">Registrar equipo</h2>
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
        <article className="flex gap-2">
          <article className="w-full">
            <label>Nombre</label>
            <input
              {...register("nombre")}
              type="text"
              className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
            />
          </article>
          <article className="w-full">
            <label>Marca</label>
            <input
              {...register("marca")}
              type="text"
              className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
            />
          </article>
        </article>
        <article className="flex gap-2">
          <article className="w-full">
            <label>Modelo</label>
            <input
              {...register("modelo")}
              type="text"
              className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
            />
          </article>
          <article className="w-full">
            <label>Sistema operativo</label>
            <input
              {...register("sistemaoperativo")}
              type="text"
              className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
            />
          </article>
        </article>
        <article className="flex gap-2">
          <article className="w-full">
            <label>Capacidad</label>
            <input
              {...register("capacidad")}
              type="text"
              className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
            />
          </article>
          <article className="w-full">
            <label>Fecha aquisicion</label>
            <input
              {...register("fecha_adquisicion")}
              type="date"
              className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
            />
          </article>
        </article>
        <article>
          <label>Cubiculo</label>
          <select
            {...register("edificio_id")}
            className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
          >
            {cubiculos.map((item, i) => (
              <option key={i} value={item.id}>
                {item.nombre}
              </option>
            ))}
          </select>
        </article>
        <button className="bg-gray-800 w-full text-gray-200 rounded p-2 hover:bg-gray-900 transition duration-300">
          Registrar equipo
        </button>
      </form>
    </>
  );
}
export default EquiposCreate;
