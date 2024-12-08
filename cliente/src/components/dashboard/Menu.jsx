import toast from "react-hot-toast";
import axios from "axios";
import AdminNav from "../../components/dashboard/AdminNav";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../../redux/userSlice";
import { BiLogOut } from "react-icons/bi";
import { useAuth } from "../../context/AuthContext";
import UserNav from "./UserNav";
import TecnicoNav from "../dashboard/TecnicoNav";

function Menu() {
  const roleStore = useSelector((state) => state.user);
  const auth = useAuth();
  const { displayName, photoURL, email } = auth.user || {};
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      await auth.logOut();
      toast.success("Sesión cerrada");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const obtenerRol = async () => {
      try {
        if (email) {
          const response = await axios.get(
            `http://localhost:3000/api/usuarios/${email}`
          );
          const rol = response.data[0]?.rol_nombre;
          const id = response.data[0]?.usuario_id;

          if (rol) {
            dispatch(addUser({ role: rol, id: id }));
          } else {
            console.log("Rol no encontrado para este usuario.");
            toast.error("No se pudo obtener el rol del usuario.");
          }
        }
      } catch (error) {
        console.error("Error al obtener el rol:", error);
        toast.error("Hubo un error al obtener el rol.");
      }
    };

    if (email) {
      obtenerRol();
    }
  }, [email, dispatch]);

  return (
    <>
      <nav className="flex justify-between items-center text-sm font-semibold p-2 border shadow">
        <img
          src={"https://cdn-icons-png.flaticon.com/512/2289/2289389.png"}
          alt="Logo"
          className="size-12"
        />
        {roleStore.role === "Administrador" && <AdminNav />}
        {roleStore.role === "Usuario" && <UserNav />}
        {roleStore.role === "Tecnico" && <TecnicoNav />}
        <section className="flex gap-1">
          <img
            src={
              photoURL ||
              "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
            }
            alt="Usuario"
            className="size-10 rounded-full"
          />
          <article>
            <span>{displayName || "Sin nombre"}</span>
            <button onClick={handleLogOut} className="flex gap-1 items-center">
              <BiLogOut /> Salir
            </button>
          </article>
        </section>
      </nav>
    </>
  );
}

export default Menu;
