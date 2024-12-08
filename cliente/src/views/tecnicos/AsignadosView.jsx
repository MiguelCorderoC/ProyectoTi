import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { changeMostrarForm } from "../../redux/formSlice";
import { addIncidente } from "../../redux/incidenteSlice";
import ComenzarIncidente from "../../components/tecnicos/ComenzarIncidente";

function AsignadosView() {
  const [incidentes, setIncidentes] = useState([]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const formStore = useSelector((state) => state.form);
  const userStore = useSelector((state) => state.user);

  const obtenerIncidentes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/asignados/" + userStore.id
      );
      setIncidentes(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener incidentes");
    }
  };

  const handleTerminarIncidente = async (id) => {
    try {
      await axios.put("http://localhost:3000/api/incidentes/terminar/" + id);
      toast.success("Incidente terminado");
    } catch (error) {
      console.error(error);
      toast.error("Error al terminar incidente");
    }
  };

  useEffect(() => {
    if (userStore.id) {
      obtenerIncidentes();
    }
  }, [userStore.id]);

  const filteredIncidentes = incidentes.filter((item) =>
    `${item.equipo_nombre} ${item.equipo_marca} ${item.equipo_modelo} ${item.tipo_equipo} ${item.sistema_operativo} ${item.edificio_nombre} ${item.departamento_nombre}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      {formStore.visible && <ComenzarIncidente />}
      <section className="p-2">
        <article className="flex justify-between items-center p-2">
          <h2 className="font-bold text-gray-800 text-3xl">Incidentes</h2>
          <article className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-gray-50 border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </article>
        </article>
        <article className="overflow-y-auto">
          <table className="w-full text-sm font-semibold text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-3 py-3">Acciones</th>
                <th className="px-3 py-3">Folio</th>
                <th className="px-3 py-3">Equipo</th>
                <th className="px-3 py-3">Nombre</th>
                <th className="px-3 py-3">Descripcion</th>
                <th className="px-3 py-3">Solicitado</th>
                <th className="px-3 py-3">Resuelto</th>
                <th className="px-3 py-3">Estado</th>
                <th className="px-3 py-3">Prioridad</th>
              </tr>
            </thead>
            <tbody>
              {filteredIncidentes.map((item, i) => (
                <tr
                  key={i}
                  className="bg-white odd:bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="p-3 text-nowrap">
                    {item.estado_id === 3 && (
                      <button
                        onClick={() => {
                          handleTerminarIncidente(item.incidente_id);
                        }}
                        className="bg-green-700 w-full text-gray-200 rounded p-2 hover:bg-green-800 transition duration-300"
                      >
                        Terminar
                      </button>
                    )}
                    {item.estado_id == 2 && (
                      <button
                        onClick={() => {
                          dispatch(
                            addIncidente({
                              id: item.incidente_id,
                              titulo: item.incidente_nombre,
                              descripcion: item.incidente_descripcion,
                              inicio: new Date(
                                item.fecha_inicio
                              ).toLocaleDateString("es-ES", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }),
                              usuario: item.usuario_nombre,
                              equipo: item.equipo_nombre,
                              departamento: item.departamento_nombre,
                              marca: item.equipo_marca,
                              modelo: item.equipo_modelo,
                              adquisicion: new Date(
                                item.fecha_adquisicion
                              ).toLocaleDateString("es-ES", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }),
                              cubiculo: item.edificio_nombre,
                            })
                          );
                          dispatch(changeMostrarForm(true));
                        }}
                        className="bg-gray-800 w-full text-gray-200 rounded p-2 hover:bg-gray-900 transition duration-300"
                      >
                        Comenzar
                      </button>
                    )}
                    {item.estado_id === 4 && (
                      <button className="bg-orange-700 w-full text-gray-200 rounded p-2 hover:bg-orange-800 transition duration-300">
                        Pendiente
                      </button>
                    )}
                    {item.estado_id === 5 && (
                      <button className="bg-blue-700 w-full text-gray-200 rounded p-2 hover:bg-blue-800 transition duration-300">
                        Liberado
                      </button>
                    )}
                  </td>
                  <td className="p-3 text-nowrap">{item.incidente_id}</td>
                  <td className="p-3 text-nowrap">{item.equipo_nombre}</td>
                  <td className="p-3 text-nowrap">{item.incidente_nombre}</td>
                  <td className="p-3">{item.incidente_descripcion}</td>
                  <td className="p-3 text-nowrap">
                    {new Date(item.fecha_inicio).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="p-3 text-nowrap">
                    {item.fecha_fin === null
                      ? "Sin terminar"
                      : new Date(item.fecha_inicio).toLocaleDateString(
                          "es-ES",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                  </td>{" "}
                  <td className="p-3 text-nowrap">{item.estado_nombre}</td>
                  <td className="p-3 text-nowrap">{item.prioridad_nombre}</td>
                </tr>
              ))}
              {filteredIncidentes.length === 0 && (
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

export default AsignadosView;
