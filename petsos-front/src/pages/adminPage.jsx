import { Link } from "react-router-dom";
import Header from "../components/header";
import StatsComunas from "../components/statsComunas.jsx";
import StatsTipos from "../components/statsTipos.jsx";

const AdminPanel = () => {
    return (
        <div className="flex-wrap min-h-screen bg-no-repeat bg-cover bg-center bg-pink-50">
            <Header/>
            <div className="max-w-6xl mx-auto mt-6 bg-white shadow-md rounded-2xl p-6 border-t-4 border-orange-500">
                <h2 className="text-3xl font-extrabold text-pink-700 mb-6 text-center">
                    Panel de Administrador
                </h2>

                {/* --- Cuadrícula de Gestión --- */}
                <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto mt-6 ">
                    <Link
                        to="/admin-usuarios"
                        className="block p-6 text-center bg-pink-100 hover:bg-pink-200 border border-pink-300 rounded-xl shadow transition duration-300"
                    >
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Gestión de Usuarios</h3>
                        <p className="text-gray-600 text-sm">Ver, editar o eliminar usuarios registrados.</p>
                    </Link>

                    <Link
                        to="/admin-reportes-comentarios"
                        className="block p-6 text-center bg-pink-100 hover:bg-pink-200 border border-pink-300 rounded-xl shadow transition duration-300"
                    >
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Reportes de Comentarios</h3>
                        <p className="text-gray-600 text-sm">Revisar comentarios reportados por otros usuarios.</p>
                    </Link>

                    <Link
                        to="/admin-reportes-publicaciones"
                        className="block p-6 text-center bg-pink-100 hover:bg-pink-200 border border-pink-300 rounded-xl shadow transition duration-300"
                    >
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Reportes de Publicaciones</h3>
                        <p className="text-gray-600 text-sm">Gestionar publicaciones con contenido inapropiado.</p>
                    </Link>
                </div>

                {/* --- Sección de Estadísticas (AQUÍ ESTÁ EL CAMBIO) --- */}
                <div className="mt-8 p-6 bg-pink-50 border border-pink-200 rounded-xl shadow">
                    <StatsTipos/>
                    <StatsComunas/>
                </div>
            
            </div>
        </div>
    );
};

export default AdminPanel;
