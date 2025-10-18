import { useEffect, useState } from "react";
import Header from "../components/header";
import { Link } from "react-router-dom";
import ListPubli from "../api/publis";
const InicioPage = () => {
    const [publicaciones, setPublicaciones] = useState([]);

    useEffect(() => {
        const cargarPublicaciones = async () => {
            try {
                const data = await ListPubli();
                // Tomar solo las últimas 3 publicaciones
                const ultimasTres = data.slice(-3);
                setPublicaciones(ultimasTres);
            } catch (error) {
                console.error("Error al cargar publicaciones:", error);
            }
        };
        cargarPublicaciones();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-white">
            <Header />

            <section className="bg-pink-200 py-20 text-center shadow-inner border-b border-pink-300">
                <h2 className="text-5xl font-extrabold text-pink-700 mb-6 tracking-wide drop-shadow-md">
                ¡Reunimos mascotas con sus familias!
                </h2>
                <p className="text-xl max-w-xl mx-auto mb-10 text-pink-800 font-semibold">
                Publica, busca, adopta o ayuda a encontrar mascotas perdidas.
                </p>
                <div className="flex justify-center space-x-8">
                    <Link to="/crear-publi" className="bg-white border-4 border-pink-400 rounded-xl px-10 py-5 text-pink-600 font-semibold shadow-lg select-none cursor-default transform hover:scale-105 transition-transform">
                        Realizar una publicación
                    </Link>
                </div>
            </section>

            <section id="publicaciones" className="py-16 px-6 max-w-6xl mx-auto">
                <h3 className="text-3xl font-bold mb-10 text-pink-700 text-center tracking-wide">
                Últimas publicaciones
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {publicaciones.map((publi) => (
                    <div
                    key={publi._id}
                    className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow cursor-default"
                    >
                    <img
                        src={`http://localhost:4000/uploads/${publi.imgURL[0]}`}
                        alt={publi.titulo}
                        className="rounded-xl mb-5 object-cover w-full h-56"
                    />
                    <h4 className="text-xl font-bold text-pink-700 mb-2">{publi.titulo}</h4>
                    <p className="text-gray-600 text-base leading-relaxed">{publi.descripcion}</p>
                    </div>
                ))}
                </div>
            </section>

            <section className="bg-pink-50 py-20 px-6 text-center">
                <h3 className="text-3xl font-bold mb-12 text-pink-600 tracking-wide">¿Cómo funciona?</h3>
                <div className="flex flex-col md:flex-row justify-center gap-16 max-w-5xl mx-auto text-left">
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-default">
                        <h4 className="font-bold text-pink-700 mb-3 text-xl">1. Regístrate</h4>
                        <p className="text-gray-700 leading-relaxed">Crea tu cuenta para comenzar a usar la plataforma.</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-default">
                        <h4 className="font-bold text-pink-700 mb-3 text-xl">2. Publica</h4>
                        <p className="text-gray-700 leading-relaxed">Reporta una mascota perdida o en adopción.</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-default">
                        <h4 className="font-bold text-pink-700 mb-3 text-xl">3. Conecta</h4>
                        <p className="text-gray-700 leading-relaxed">Contacta a quien encontró o busca hogar para una mascota.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default InicioPage;
