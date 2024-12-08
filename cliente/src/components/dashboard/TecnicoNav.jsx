import { Link } from "react-router-dom";

function TecnicoNav() {
  return (
    <>
      <ul className="text-lg flex gap-5 items-center">
        <li>
          <Link to={"/asignados"}>Incidentes</Link>
        </li>
        <li>
          <Link to={"tecnico/problemas/"}>Problemas</Link>
        </li>
      </ul>
    </>
  );
}
export default TecnicoNav;
