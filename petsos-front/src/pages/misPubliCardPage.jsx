import { useState, useEffect } from "react";
import { obtenerMisPublicaciones } from "../api/publi.js";
import { usePubli } from "../context/PublicacionContext.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MisPubliCard = () => {
    const { actualizarPubli, eliminarPubli } = usePubli();
    const [misPublis, setMisPublis] = useState([]);
    const [seleccionPubli, setSeleccionPubli] = useState(null);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [updatedPubli, setUpdatedPubli] = useState({
        titulo: "",
        descripcion: "",
        tipo: "",
        imgURL: null,
        ubicacion: {
            comuna: "",
            ciudad: "",
            region: "",
        },
    });

    const [publiAEliminar, setPubliAEliminar] = useState(null);

    useEffect(() => {
        const cargarPublicaciones = async () => {
            try {
                const res = await obtenerMisPublicaciones();
                setMisPublis(res.data);
            } catch (error) {
                console.error("Error al cargar tus publicaciones:", error);
            }
        };

        cargarPublicaciones();
    }, []);

    const handleSelectPubli = (publi) => {
        setSeleccionPubli(publi);
        setUpdatedPubli({
            titulo: publi.titulo,
            descripcion: publi.descripcion,
            tipo: publi.tipo,
            imgURL: null,
            ubicacion: {
                comuna: publi.ubicacion?.comuna || "",
                ciudad: publi.ubicacion?.ciudad || "",
                region: publi.ubicacion?.region || "",
            },
        });
        setMostrarForm(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedPubli((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUbicacionChange = (e) => {
        const { name, value } = e.target;
        setUpdatedPubli((prev) => ({
        ...prev,
        ubicacion: {
            ...prev.ubicacion,
            [name]: value,
        },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("titulo", updatedPubli.titulo);
        formData.append("descripcion", updatedPubli.descripcion);
        formData.append("tipo", updatedPubli.tipo);
        formData.append("ubicacion[region]", updatedPubli.ubicacion.region);
        formData.append("ubicacion[ciudad]", updatedPubli.ubicacion.ciudad);
        formData.append("ubicacion[comuna]", updatedPubli.ubicacion.comuna);
        if (updatedPubli.imgURL instanceof File) {
            formData.append("imgURL", updatedPubli.imgURL);
        }

        try {
            await actualizarPubli(seleccionPubli, formData);
            const res = await obtenerMisPublicaciones();
            setMisPublis(res.data);
            setMostrarForm(false);
        } catch (error) {
        console.error("Error al actualizar:", error);
        }
    };

    const handleCloseForm = () => {
        setMostrarForm(false);
    };

    const confirmarEliminacion = async () => {
        try {
            await eliminarPubli(publiAEliminar);
            setMisPublis((prevPublis) =>
                prevPublis.filter((p) => p._id !== publiAEliminar._id)
            );
            toast.success("Publicación eliminada exitosamente", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            setPubliAEliminar(null);
        } catch (error) {
            console.error("Error al eliminar la publicación", error);
            toast.error("Error al eliminar la publicación", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        }
    };

    const cancelarEliminacion = () => {
        setPubliAEliminar(null);
    };

    return (
        <div>
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
            theme="colored"
        />
        <h2 className="text-2xl font-bold mb-6 text-pink-700">Mis Publicaciones</h2>
        {mostrarForm && setSeleccionPubli && (
            <div className="fixed inset-0 z-50 flex justify-center items-center">
                <div className="bg-zinc-800 text-white rounded-2xl shadow-2xl w-full max-w-xl p-6 relative">
                <button
                    onClick={handleCloseForm}
                    className="absolute top-4 right-4 text-gray-300 hover:text-white text-3xl font-light"
                >
                    &times;
                </button>

                <h2 className="text-xl font-semibold mb-6 text-center">Editar publicación</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="titulo"
                            placeholder="¿Cuál es el título?"
                            required
                            className="w-full bg-zinc-700 text-white p-3 rounded-xl border border-zinc-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                            value={updatedPubli.titulo}
                            onChange={handleInputChange}
                        />
                        <textarea
                            name="descripcion"
                            placeholder="Escribe una descripción..."
                            required
                            className="w-full bg-zinc-700 text-white p-3 rounded-xl border border-zinc-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                            rows="3"
                            value={updatedPubli.descripcion}
                            onChange={handleInputChange}
                        />
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Tipo de publicación:</label>
                            <div className="flex gap-4">
                                {[
                                { label: "Rescate", value: "rescate" },
                                { label: "Adopción", value: "adopcion" },
                                { label: "Pérdida", value: "perdida" },
                                ].map((opcion) => (
                                <label
                                    key={opcion.value}
                                    className={`cursor-pointer px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200
                                    ${
                                        updatedPubli.tipo === opcion.value
                                        ? "bg-white text-black border-yellow-200 shadow-lg"
                                        : "bg-zinc-700 text-gray-200 border-zinc-500 hover:bg-zinc-600"
                                    }`}
                                >
                                    <input
                                    type="radio"
                                    name="tipo"
                                    value={opcion.value}
                                    className="hidden"
                                    required
                                    checked={updatedPubli.tipo === opcion.value}
                                    onChange={handleInputChange}
                                    />
                                    {opcion.label}
                                </label>
                                ))}
                            </div>
                        </div>
                        {/* Imagen */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-400">Imagen (PNG):</label>
                            <input
                                type="file"
                                accept="image/png"
                                className="bg-zinc-700 text-white p-2 rounded-xl"
                                onChange={(e) =>
                                setUpdatedPubli({ ...updatedPubli, imgURL: e.target.files[0] })
                                }
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <input
                                type="text"
                                name="comuna"
                                placeholder="Comuna"
                                required
                                className="bg-zinc-700 text-white p-3 rounded-xl border border-zinc-600 placeholder-gray-400"
                                value={updatedPubli.ubicacion.comuna}
                                onChange={handleUbicacionChange}
                            />
                            <input
                                type="text"
                                name="ciudad"
                                placeholder="Ciudad"
                                required
                                className="bg-zinc-700 text-white p-3 rounded-xl border border-zinc-600 placeholder-gray-400"
                                value={updatedPubli.ubicacion.ciudad}
                                onChange={handleUbicacionChange}
                            />
                            <input
                                type="text"
                                name="region"
                                placeholder="Región"
                                required
                                className="bg-zinc-700 text-white p-3 rounded-xl border border-zinc-600 placeholder-gray-400"
                                value={updatedPubli.ubicacion.region}
                                onChange={handleUbicacionChange}
                            />
                        </div>

                        <div className="flex justify-end gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => setMostrarForm(false)}
                                className="bg-gray-600 text-white px-4 py-2 rounded-xl hover:bg-gray-500 transition"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
                            >
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}

            {misPublis.length === 0 ? (
                <p className="text-gray-600">No has publicado nada aún.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
                {misPublis.map((publi) => (
                    <div key={publi._id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                    {publi.imgURL.length > 0 && (
                        <img
                        src={`http://localhost:4000/uploads/${publi.imgURL[0]}`}
                        alt="Foto"
                        className="w-full h-64 object-cover"
                        />
                    )}
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{publi.titulo}</h3>
                        <p className="text-gray-600 text-sm">{publi.descripcion}</p>
                        {publi.ubicacion && (
                        <p className="mt-2 text-xs text-gray-400">
                            📍 {publi.ubicacion.comuna}, {publi.ubicacion.ciudad}
                        </p>
                        )}
                    </div>
                    <div className="p-4 flex justify-end">
                        <button
                            className=" bg-zinc-200 hover:bg-zinc-900 text-black hover:text-white px-4 py-2 rounded-lg mx-2 font-semibold hover:shadow-lg  ease-in-out"
                            onClick={() => handleSelectPubli(publi)}
                            >
                                Editar
                        </button>
                        <button
                        className=" bg-zinc-200 hover:bg-red-600 text-black hover:text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg  ease-in-out"
                        onClick={() => setPubliAEliminar(publi)}
                        >
                            Eliminar
                        </button>
                    </div>
                    </div>
                ))}
                </div>
            )}
            {publiAEliminar && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900">
                        ¿Estás seguro que quieres eliminar esta publicación?
                        </h3>
                        <p className="mb-6 text-gray-700">{publiAEliminar.titulo}</p>
                        {publiAEliminar.imgURL && (
                            <img
                            src={`http://localhost:4000/uploads/${publiAEliminar.imgURL}`}
                            className="w-full h-auto rounded-md mb-2 object-cover max-h-80"
                            />
                        )}
                        <div className="flex justify-end gap-4">
                        <button
                            onClick={cancelarEliminacion}
                            className="px-4 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 transition"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={confirmarEliminacion}
                            className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
                        >
                            Sí, eliminar
                        </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MisPubliCard
