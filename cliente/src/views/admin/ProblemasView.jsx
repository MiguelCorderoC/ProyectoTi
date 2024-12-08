import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProblemaCreate from "../../components/admin/ProblemaCreate";
import { useDispatch } from "react-redux";
import { changeMostrarForm } from "../../redux/formSlice";
import { useSelector } from "react-redux";

function ProblemasView() {
  const [problemas, setProblemas] = useState([]);
  const dispatch = useDispatch();
  const formStore = useSelector((state) => state.form);

  const obtenerProblemas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/problemas");
      setProblemas(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Error al obtener problemas");
    }
  };

  useEffect(() => {
    obtenerProblemas();
  }, []);

  return (
    <>
      {formStore.visible && <ProblemaCreate />}
      <section className="p-2">
        <article className="flex justify-between items-center p-2">
          <h2 className="font-bold text-gray-800 text-3xl">
            Gestor de problemas
          </h2>
          <article className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-gray-50 border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
            />
            <button
              onClick={() => {
                dispatch(changeMostrarForm(true));
              }}
              className="bg-gray-800 text-gray-200 rounded p-2 hover:bg-gray-900 transition duration-300"
            >
              Nuevo
            </button>
          </article>
        </article>
        <article className="overflow-y-auto">
          <table className="w-full text-sm font-semibold text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-3 py-3">Folio</th>
                <th className="px-3 py-3">Problema</th>
                <th className="px-3 py-3">Descripcion</th>
                <th className="px-3 py-3">Equipo</th>
                <th className="px-3 py-3">Tecnico</th>
                <th className="px-3 py-3">Adquisicion</th>
                <th className="px-3 py-3">Edificio</th>
                <th className="px-3 py-3">Departamento</th>
              </tr>
            </thead>
            <tbody>
              {problemas.map((item, i) => (
                <tr
                  key={i}
                  className="bg-white odd:bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="p-3 text-nowrap">{item.problema_id}</td>
                  <td className="p-3 text-nowrap">{item.problema_nombre}</td>
                  <td className="p-3">{item.problema_descripcion}</td>
                  <td className="p-3 text-nowrap">{item.equipo_nombre}</td>
                  <td className="p-3 text-nowrap">{item.tecnico_nombre}</td>
                  <td className="p-3 text-nowrap">
                    {new Date(item.equipo_fecha_adquisicion).toLocaleDateString(
                      "es-ES",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </td>
                  <td className="p-3 text-nowrap">{item.edificio_nombre}</td>
                  <td className="p-3 text-nowrap">
                    {item.departamento_nombre}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </section>
    </>
  );
}
export default ProblemasView;
