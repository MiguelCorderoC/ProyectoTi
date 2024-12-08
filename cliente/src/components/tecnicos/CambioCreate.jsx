import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CgClose } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { changeMostrarForm } from "../../redux/formSlice";
import { useSelector } from "react-redux";

function CambioCreate() {
  const { register, handleSubmit } = useForm();
  const problemaStore = useSelector((state) => state.problema);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const { nombre, descripcion } = data;
    try {
      axios.post("http://localhost:3000/api/cambios", {
        nombre,
        descripcion,
        id_equipo: problemaStore.equipo_id,
      });
      toast.success("Cambio registrado");
    } catch (error) {
      console.error(error);
      toast.error("Error al registrar cambio");
    }
  };

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
        <article className="flex gap-2 justify-between">
          <article className=" inline-block">
            <label>Folio</label>
            <input
              disabled
              value={problemaStore.id}
              type="text"
              className="bg-gray-50 border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
            />
          </article>
          <article className="">
            <label>Fecha adquisicion</label>
            <input
              disabled
              value={problemaStore.adquisicion}
              type="text"
              className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
            />
          </article>
        </article>
        <article>
          <label>Equipo</label>
          <input
            disabled
            value={problemaStore.equipo}
            type="text"
            className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
          />
        </article>
        <article>
          <article className="flex gap-2">
            <article className="w-full">
              <label>Marca</label>
              <input
                disabled
                value={problemaStore.marca}
                type="text"
                className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
              />
            </article>
            <article className="w-full">
              <label>Modelo</label>
              <input
                disabled
                value={problemaStore.modelo}
                type="text"
                className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
              />
            </article>
          </article>
          <article className="flex gap-2">
            <article className="w-full">
              <label>Cubiculo</label>
              <input
                disabled
                value={problemaStore.edificio}
                type="text"
                className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
              />
            </article>
            <article className="w-full">
              <label>Departamento</label>
              <input
                disabled
                value={problemaStore.departamento}
                type="text"
                className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
              />
            </article>
          </article>
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
        <button className="bg-gray-800 w-full text-gray-200 rounded p-2 hover:bg-gray-900 transition duration-300">
          Registrar problema
        </button>
      </form>
    </>
  );
}
export default CambioCreate;
