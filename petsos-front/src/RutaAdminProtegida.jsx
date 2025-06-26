import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {
    const { loading, isAuthenticated, user } = useAuth();

    // Mostrar un mensaje de carga mientras se verifica el estado de autenticación
    if (loading) return <h1>Cargando...</h1>;

    // Redirigir al login si no está autenticado
    if (!isAuthenticated) return <Navigate to="/login" replace />;

    // Verificar si el rol del usuario es 'admin'
    if (user.roles[0]?.nombre !== "admin") return <Navigate to="/" replace />;

    // Permitir el acceso si el usuario es admin
    return <Outlet />;
}

export default AdminRoute;