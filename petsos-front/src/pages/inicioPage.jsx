import { Link } from "react-router-dom";

import Header from "../components/header";

const InicioPage = () => {
    return (
        <div className="flex-wrap min-h-screen bg-no-repeat bg-cover bg-center">
            <Header/>
            
            <section className="bg-pink-100 py-16 text-center">
                <h2 className="text-4xl font-bold mb-4">¡Reunimos mascotas con sus familias!</h2>
                <p className="text-lg mb-6">Publica, busca, adopta o ayuda a encontrar mascotas perdidas</p>
                <div className="space-x-4">
                    <button className="bg-pink-600 text-white px-6 py-3 rounded">Buscar Mascotas</button>
                    <button className="bg-white border border-pink-600 text-pink-600 px-6 py-3 rounded">Publicar Adopción</button>
                </div>
            </section>

            <section id="publicaciones" className="py-12 px-4 max-w-6xl mx-auto">
                <h3 className="text-2xl font-semibold mb-6">Últimas publicaciones</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Ejemplo de tarjeta */}
                    <div className="bg-white shadow p-4 rounded">
                        <img src="https://placekitten.com/300/200" alt="Mascota perdida" className="rounded mb-3" />
                        <h4 className="font-bold">Gato perdido en Ñuñoa</h4>
                        <p>Responde al nombre “Michi”. Se perdió el 10 de mayo.</p>
                    </div>
                {/* Puedes duplicar y mapear otras tarjetas desde props o un array */}
                </div>
            </section>

            <section className="bg-gray-50 py-12 px-4 text-center">
                <h3 className="text-2xl font-semibold mb-6">¿Cómo funciona?</h3>
                <div className="flex flex-col md:flex-row justify-center gap-10 text-left">
                    <div>
                        <h4 className="font-bold">1. Regístrate</h4>
                        <p>Crea tu cuenta para comenzar a usar la plataforma.</p>
                    </div>
                    <div>
                        <h4 className="font-bold">2. Publica</h4>
                        <p>Reporta una mascota perdida o en adopción.</p>
                    </div>
                    <div>
                        <h4 className="font-bold">3. Conecta</h4>
                        <p>Contacta a quien encontró o busca hogar para una mascota.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default InicioPage;