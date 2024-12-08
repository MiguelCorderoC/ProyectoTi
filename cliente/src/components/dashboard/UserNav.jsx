import { Link } from "react-router-dom";

function UserNav() {
  return (
    <>
      <ul className="text-lg flex gap-5 items-center">
        <li>
          <Link to={"/solicitudes"}>Solicitudes</Link>
        </li>
        <li>
          <Link to={"/equipos"}>Equipos</Link>
        </li>
      </ul>
    </>
  );
}
export default UserNav;
