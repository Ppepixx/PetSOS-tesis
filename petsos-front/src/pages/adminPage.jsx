import { Link } from "react-router-dom";
import Header from "../components/header";

const AdminPanel = () => {
    return (
        <div className="flex-wrap min-h-screen bg-no-repeat bg-cover bg-center">
           <Header/>
            <div className="max-w-6xl mx-auto mt-6 bg-white shadow-md rounded-2xl p-6 border-t-4 border-orange-500">
                <h2 className="text-3xl font-extrabold text-orange-500 mb-6 text-center">
                    Panel de Administrador
                </h2>

                <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto mt-6 ">
                    <Link
                        to="/admin/usuarios"
                        className="block p-6 text-center bg-orange-100 hover:bg-orange-200 rounded-xl shadow transition duration-300"
                    >
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Administrar Usuarios</h3>
                        <p className="text-gray-600 text-sm">Ver, editar o eliminar usuarios registrados.</p>
                    </Link>

                    <Link
                        to="/admin/reportes-comentarios"
                        className="block p-6 text-center bg-orange-100 hover:bg-orange-200 rounded-xl shadow transition duration-300"
                    >
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Reportes de Comentarios</h3>
                        <p className="text-gray-600 text-sm">Revisar comentarios reportados por otros usuarios.</p>
                    </Link>

                    <Link
                        to="/admin/reportes-publicaciones"
                        className="block p-6 text-center bg-orange-100 hover:bg-orange-200 rounded-xl shadow transition duration-300"
                    >
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Reportes de Publicaciones</h3>
                        <p className="text-gray-600 text-sm">Gestionar publicaciones con contenido inapropiado.</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
