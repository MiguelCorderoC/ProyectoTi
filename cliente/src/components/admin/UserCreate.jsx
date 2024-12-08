import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CgClose } from "react-icons/cg";
import { useAuth } from "../../context/AuthContext";
import { useDispatch } from "react-redux";
import { changeMostrarUsuario } from "../../redux/usuarioSlice";

function UserCreate() {
  const [roles, setRoles] = useState([]);
  const { register, handleSubmit } = useForm();
  const auth = useAuth();
  const dispatch = useDispatch();

  const obtenerRoles = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/roles");
      setRoles(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener roles");
    }
  };

  const onSubmit = async (data) => {
    const {
      nombre,
      apellidopaterno,
      apellidomaterno,
      correo,
      rol_id,
      password,
    } = data;
    try {
      await axios.post("http://localhost:3000/api/usuarios", {
        nombre,
        apellidopaterno,
        apellidomaterno,
        correo,
        rol_id,
      });
      await auth.register(correo, password);
      toast.success("Usuario registrado");
    } catch (error) {
      console.error(error);
      toast.error("Error al registrar usuario");
    }
  };

  useEffect(() => {
    obtenerRoles();
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="fixed p-2 space-y-2 bg-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded border shadow w-full max-w-md font-semibold text-sm"
      >
        <article className="flex justify-between items-start">
          <h2 className="text-2xl">Nuevo usuario</h2>
          <button
            type="button"
            onClick={() => {
              dispatch(changeMostrarUsuario(false));
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
        <article className="flex gap-2">
          <article className="w-full">
            <label>Apellido paterno</label>
            <input
              {...register("apellidopaterno")}
              type="text"
              className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
            />
          </article>
          <article className="w-full">
            <label>Apellido materno</label>
            <input
              {...register("apellidomaterno")}
              type="text"
              className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
            />
          </article>
        </article>
        <article>
          <label>Rol</label>
          <select
            {...register("rol_id")}
            className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
          >
            {roles.map((item, i) => (
              <option key={i} value={item.id}>
                {item.nombre}
              </option>
            ))}
          </select>
        </article>
        <article>
          <label>Correo</label>
          <input
            {...register("correo")}
            type="text"
            className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
          />
        </article>
        <article>
          <label>Contraseña</label>
          <input
            {...register("password")}
            type="password"
            className="bg-gray-50 w-full border shadow border-gray-300 text-gray-900 text-sm block rounded p-2.5 focus:border-blue-300 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition duration-300 ease-in-out"
          />
        </article>
        <button className="bg-gray-800 w-full text-gray-200 rounded p-2 hover:bg-gray-900 transition duration-300">
          Crear usuario
        </button>
      </form>
    </>
  );
}
export default UserCreate;
