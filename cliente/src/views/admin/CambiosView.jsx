import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function CambiosView() {
  const [cambios, setCambios] = useState([]);

  const obtenerCambios = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/cambios");
      setCambios(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener cambios");
    }
  };

  useEffect(() => {
    obtenerCambios();
  }, []);

  return (
    <>
      <section className="p-2">
        <article className="flex justify-between items-center p-2">
          <h2 className="font-bold text-gray-800 text-3xl">
            Gestor de cambios
          </h2>
          <input
            type="text"
            className="bg-gray-50 border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
          />
        </article>
        <article className="overflow-y-auto">
          <table className="w-full text-sm font-semibold text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-3 py-3">Folio</th>
                <th className="px-3 py-3">Cambio</th>
                <th className="px-3 py-3">Descripcion</th>
                <th className="px-3 py-3">Problema</th>
                <th className="px-3 py-3">Descripcion</th>
                <th className="px-3 py-3">Equipo</th>
                <th className="px-3 py-3">Marca</th>
                <th className="px-3 py-3">Modelo</th>
                <th className="px-3 py-3">Tecnico</th>
              </tr>
            </thead>
            <tbody>
              {cambios.map((item, i) => (
                <tr
                  key={i}
                  className="bg-white odd:bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="p-3 text-nowrap">{item.cambio_id}</td>
                  <td className="p-3 text-nowrap">{item.cambio_nombre}</td>
                  <td className="p-3">{item.cambio_descripcion}</td>
                  <td className="p-3 text-nowrap">{item.problema_nombre}</td>
                  <td className="p-3">{item.problema_descripcion}</td>
                  <td className="p-3 text-nowrap">{item.equipo_nombre}</td>
                  <td className="p-3 text-nowrap">{item.equipo_marca}</td>
                  <td className="p-3 text-nowrap">{item.equipo_modelo}</td>
                  <td className="p-3 text-nowrap">
                    {item.tecnico_nombre_completo}
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
export default CambiosView;
