import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CgClose } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { changeMostrarForm } from "../../redux/formSlice";
import { useSelector } from "react-redux";

function AtenderIncidente() {
  const [prioridades, setPrioridades] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const incidenteStore = useSelector((state) => state.incidente);

  const obtenerTecnicos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/tecnicos");
      setTecnicos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerPrioridades = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/prioridades");
      setPrioridades(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener prioridades");
    }
  };

  const onSubmit = async (data) => {
    const { prioridad_id, tecnico_id } = data;
    try {
      await axios.put(
        "http://localhost:3000/api/incidentes/" + incidenteStore.id,
        {
          prioridad_id,
          tecnico_id,
        }
      );
      toast.success("Incidente asignado");
    } catch (error) {
      console.error(error);
      toast.error("Error al registrar usuario");
    }
  };

  useEffect(() => {
    obtenerPrioridades();
    obtenerTecnicos();
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="fixed p-2 space-y-2 bg-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded border shadow w-full max-w-md font-semibold text-sm"
      >
        <article className="flex justify-between items-start">
          <h2 className="text-2xl">Atender incidente</h2>
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
          <label>Titulo</label>
          <input
            disabled
            value={incidenteStore.titulo}
            type="text"
            className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
          />
        </article>
        <article>
          <label>Descripcion</label>
          <textarea
            disabled
            value={incidenteStore.descripcion}
            type="text"
            className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
          />
        </article>
        <article className="flex gap-2">
          <article className="w-full">
            <label>Solicitado</label>
            <input
              disabled
              value={incidenteStore.inicio}
              type="text"
              className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
            />
          </article>
          <article className="w-full">
            <label>Usuario</label>
            <input
              disabled
              value={incidenteStore.usuario}
              type="text"
              className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
            />
          </article>
        </article>
        <article className="flex gap-2">
          <article className="w-full">
            <label>Equipo</label>
            <input
              disabled
              value={incidenteStore.equipo}
              type="text"
              className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
            />
          </article>
          <article className="w-full">
            <label>Marca</label>
            <input
              disabled
              value={incidenteStore.marca}
              type="text"
              className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
            />
          </article>
          <article className="w-full">
            <label>Modelo</label>
            <input
              disabled
              value={incidenteStore.modelo}
              type="text"
              className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
            />
          </article>
        </article>
        <article>
          <article className="flex gap-2">
            <article className="w-full">
              <label>Cubiculo</label>
              <input
                disabled
                value={incidenteStore.cubiculo}
                type="text"
                className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
              />
            </article>
            <article className="w-full">
              <label>Departamento</label>
              <input
                disabled
                value={incidenteStore.departamento}
                type="text"
                className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
              />
            </article>
          </article>
          <label>Prioridad</label>
          <select
            {...register("prioridad_id")}
            className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
          >
            {prioridades.map((item, i) => (
              <option key={i} value={item.id}>
                {item.nombre}
              </option>
            ))}
          </select>
        </article>
        <article>
          <label>Asignar tecnico</label>
          <select
            {...register("tecnico_id")}
            className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
          >
            {tecnicos.map((item, i) => (
              <option key={i} value={item.usuario_id}>
                {item.usuario_nombre +
                  " " +
                  item.usuario_apellidopaterno +
                  " " +
                  item.usuario_apellidomaterno}
              </option>
            ))}
          </select>
        </article>
        <button className="bg-gray-800 w-full text-gray-200 rounded p-2 hover:bg-gray-900 transition duration-300">
          Atender incidente
        </button>
      </form>
    </>
  );
}
export default AtenderIncidente;
