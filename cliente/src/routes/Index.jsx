import { Route, Routes, useLocation } from "react-router-dom";
import LogInView from "../views/auth/LogInView";
import HomeView from "../views/HomeView";
import ProtectedRoute from "../components/private/ProtectedRoute";
import Menu from "../components/dashboard/Menu";
import UsuariosView from "../views/admin/UsuariosView";
import EquiposView from "../views/usuarios/EquiposView";
import SolicitudesView from "../views/usuarios/SolicitudesView";
import IncidenciasView from "../views/admin/IncidenciasView";
import AsignadosView from "../views/tecnicos/AsignadosView";
import ProblemasView from "../views/admin/ProblemasView";
import ProblemasTecnicosView from "../views/tecnicos/ProblemasTecnicosView";
import CambiosView from "../views/admin/CambiosView";

function Index() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" && <Menu />}

      <Routes>
        <Route path="/login" element={<LogInView />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomeView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute>
              <UsuariosView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/equipos"
          element={
            <ProtectedRoute>
              <EquiposView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/solicitudes"
          element={
            <ProtectedRoute>
              <SolicitudesView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/incidentes"
          element={
            <ProtectedRoute>
              <IncidenciasView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/asignados"
          element={
            <ProtectedRoute>
              <AsignadosView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/problemas"
          element={
            <ProtectedRoute>
              <ProblemasView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tecnico/problemas"
          element={
            <ProtectedRoute>
              <ProblemasTecnicosView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cambios"
          element={
            <ProtectedRoute>
              <CambiosView />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default Index;
