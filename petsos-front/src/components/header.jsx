import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Notificaciones from "./notificaciones.jsx";

const Header = () => {
    const { isAuthenticated, logout, user, isAdmin } = useAuth();

    return (
        <header className="top-0 left-0 w-full py-5 px-6 md:px-24 flex flex-wrap justify-between items-center border-b-4 border-orange-400 z-50 bg-white shadow-md">
            <Link to="/" className="flex items-center space-x-3">
                <img src="src/img/PETSOS.png" alt="PETSOS logo" className="h-10 w-10" />
                <h1 className="text-3xl md:text-4xl text-orange-500 font-extrabold tracking-wide select-none">
                PETSOS
                </h1>
            </Link>

            <nav className="flex flex-wrap space-x-4 md:space-x-10 items-center text-gray-800 text-lg font-semibold mt-4 md:mt-0">
                <Link to="/" className="hover:text-orange-500 transition">Inicio</Link>
                <Link to="/publi" className="hover:text-orange-500 transition">Publicaciones</Link>
                <Link to="/consejos" className="hover:text-orange-500 transition">Consejos</Link>
                <Link to="/FAQ" className="hover:text-orange-500 transition">FAQ</Link>
                
                {isAuthenticated ? (
                    <div className="flex items-center space-x-4">
                        <a className="text-sm md:text-base text-gray-600 hover:text-orange-500 transition" href="/perfil"> 
                            🐾 {user.username}
                        </a>
                        
                        {/* Botón de administrador - solo visible para admins */}
                        {isAdmin() && (
                            <Link
                                to="/admin-panel"
                                className="py-2 px-4 border-2 border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition "
                            >
                                <span>⚙️</span>
                                <span>Panel Admin</span>
                            </Link>
                        )}
                        
                        <Notificaciones />
                        
                        <Link
                            onClick={() => logout()}
                            to="/"
                            className="py-2 px-4 border-2 border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition"
                        >
                            Cerrar sesión
                        </Link>
                    </div>
                    
                ) : (
                    <div className="flex items-center space-x-2">
                        <Link
                            to="/login"
                            className="py-2 px-4 border-2 border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition"
                        >
                            Iniciar sesión
                        </Link>
                        <Link
                            to="/register"
                            className="py-2 px-4 border-2 border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition"
                        >
                            Registrarse
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;