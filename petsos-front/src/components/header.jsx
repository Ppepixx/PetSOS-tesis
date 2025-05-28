import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Header = () => {
    const { isAuthenticated, logout, user } = useAuth();

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
                <Link to="/adoptar" className="hover:text-orange-500 transition">Adoptar</Link>
                <Link to="/consejos" className="hover:text-orange-500 transition">Consejos</Link>
                <Link to="/ayuda" className="hover:text-orange-500 transition">Ayuda</Link>

                {isAuthenticated ? (
                    <>
                        <span className="text-sm md:text-base text-gray-600">🐾 {user.username}</span>
                        <Link
                            onClick={() => logout()}
                            to="/"
                            className="ml-4 py-2 px-4 border-2 border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition"
                        >
                            Cerrar sesión
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="ml-4 py-2 px-4 border-2 border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition"
                        >
                            Iniciar sesión
                        </Link>
                        <Link
                            to="/register"
                            className="ml-2 py-2 px-4 border-2 border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition"
                        >
                            Registrarse
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;