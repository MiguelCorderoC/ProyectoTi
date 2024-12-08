import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserCreate from "../../components/admin/UserCreate";
import { changeMostrarUsuario } from "../../redux/usuarioSlice";
import { useDispatch, useSelector } from "react-redux";

function UsuariosView() {
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const usuarioStore = useSelector((state) => state.usuario);

  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/usuarios");
      setUsuarios(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener usuarios");
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const filteredUsuarios = usuarios.filter((usuario) => {
    return (
      usuario.usuario_nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.usuario_apellidopaterno
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      usuario.usuario_apellidomaterno
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      usuario.usuario_correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.rol_nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      {usuarioStore.visible && <UserCreate />}
      <section className="p-2">
        <article className="flex justify-between items-center p-2">
          <h2 className="font-bold text-gray-800 text-3xl">Usuarios</h2>
          <article className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-gray-50 border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={() => {
                dispatch(changeMostrarUsuario(true));
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
                <th className="px-3 py-3">Apellidos</th>
                <th className="px-3 py-3">Correo</th>
                <th className="px-3 py-3">Rol</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsuarios.map((item, i) => (
                <tr
                  key={i}
                  className="bg-white odd:bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="p-3">{item.usuario_nombre}</td>
                  <td className="p-3">
                    {item.usuario_apellidopaterno}{" "}
                    {item.usuario_apellidomaterno}
                  </td>
                  <td className="p-3">{item.usuario_correo}</td>
                  <td className="p-3">{item.rol_nombre}</td>
                </tr>
              ))}
              {filteredUsuarios.length === 0 && (
                <tr className="w-full">
                  <td
                    colSpan="11"
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

export default UsuariosView;
