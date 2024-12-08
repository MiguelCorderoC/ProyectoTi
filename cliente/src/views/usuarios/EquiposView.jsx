import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EquiposCreate from "../../components/usuarios/EquipoCreate";
import { useSelector, useDispatch } from "react-redux";
import { changeMostrarForm } from "../../redux/formSlice";

function EquiposView() {
  const [equipos, setEquipos] = useState([]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const formStore = useSelector((state) => state.form);

  const obtenerEquipos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/equipos");
      setEquipos(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener equipos");
    }
  };

  useEffect(() => {
    obtenerEquipos();
  }, []);

  const filteredEquipos = equipos.filter((item) =>
    `${item.equipo_nombre} ${item.equipo_marca} ${item.equipo_modelo} ${item.tipo_equipo} ${item.sistema_operativo} ${item.edificio_nombre} ${item.departamento_nombre}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      {formStore.visible && <EquiposCreate />}
      <section className="p-2">
        <article className="flex justify-between items-center p-2">
          <h2 className="font-bold text-gray-800 text-3xl">Equipos</h2>
          <article className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-gray-50 border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
                <th className="px-3 py-3">Nombre</th>
                <th className="px-3 py-3">Marca</th>
                <th className="px-3 py-3">Modelo</th>

                <th className="px-3 py-3">SO</th>
                <th className="px-3 py-3">Capacidad</th>
                <th className="px-3 py-3">Adquisición</th>
                <th className="px-3 py-3">Modificación</th>
                <th className="px-3 py-3">Cubículo</th>
                <th className="px-3 py-3">Departamento</th>
              </tr>
            </thead>
            <tbody>
              {filteredEquipos.map((item, i) => (
                <tr
                  key={i}
                  className="bg-white odd:bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="p-3 text-nowrap">{item.equipo_nombre}</td>
                  <td className="p-3 text-nowrap">{item.equipo_marca}</td>
                  <td className="p-3 text-nowrap">{item.equipo_modelo}</td>
                  <td className="p-3 text-nowrap">{item.sistema_operativo}</td>
                  <td className="p-3 text-nowrap">{item.capacidad}</td>
                  <td className="p-3 text-nowrap">
                    {new Date(item.fecha_adquisicion).toLocaleDateString(
                      "es-ES",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </td>
                  <td className="p-3 text-nowrap">
                    {new Date(
                      item.fecha_ultimo_mantenimiento
                    ).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="p-3 text-nowrap">{item.edificio_nombre}</td>
                  <td className="p-3 text-nowrap">
                    {item.departamento_nombre}
                  </td>
                </tr>
              ))}
              {filteredEquipos.length === 0 && (
                <tr className="w-full">
                  <td
                    colSpan="10"
                    className="text-center font-bold text-xl py-4 text-gray-500"
                  >
                    Sin resultados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </article>
      </section>
    </>
  );
}

export default EquiposView;
