import { Link } from "react-router-dom";

function AdminNav() {
  return (
    <>
      <ul className="text-lg flex gap-5 items-center">
        <li>
          <Link to={"/incidentes"}>Incidencias</Link>
        </li>
        <li>
          <Link to={"/equipos"}>Configuraciones</Link>
        </li>
        <li>
          <Link to={"/admin/problemas"}>Problemas</Link>
        </li>
        <li>
          <Link to={"/cambios"}>Cambios</Link>
        </li>
        <li>
          <Link to={"/usuarios"}>Usuarios</Link>
        </li>
      </ul>
    </>
  );
}
export default AdminNav;
