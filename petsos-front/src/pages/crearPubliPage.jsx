// petsos-front/src/pages/crearPubliPage.jsx

import { useForm } from "react-hook-form"
import Header from "../components/header.jsx"
import { usePubli } from "../context/PublicacionContext.jsx"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// --- INICIO DE CAMBIOS ---
import { useEffect, useState } from "react"; 
// Asegúrate de que la ruta a tu api (publi.js) sea correcta
import { getUbicacionesRequest } from "../api/publi.js"; 
// --- FIN DE CAMBIOS ---


const CrearPubliPage = ()=>{
    // --- INICIO DE CAMBIOS ---
    // Añadimos 'watch' para observar cambios en el formulario
    const { register, handleSubmit, reset, watch } = useForm();
    // --- FIN DE CAMBIOS ---
    const { crearPubli } = usePubli();

    // --- INICIO DE CAMBIOS ---
    // Estados para manejar las listas de regiones y comunas
    const [ubicaciones, setUbicaciones] = useState({});
    const [regionesList, setRegionesList] = useState([]);
    const [comunasList, setComunasList] = useState([]);

    // Observamos el valor del campo 'ubicacion.region'
    const selectedRegion = watch('ubicacion.region');

    // Efecto para cargar las ubicaciones (regiones y comunas) desde la API
    useEffect(() => {
        const cargarUbicaciones = async () => {
          try {
            // Esta función debe existir en tu /api/publi.js
            const res = await getUbicacionesRequest(); 
            setUbicaciones(res.data);
            setRegionesList(Object.keys(res.data || {}));
          } catch (error) {
            console.error("Error al cargar ubicaciones:", error);
            toast.error("Error al cargar las ubicaciones.");
          }
        };
        cargarUbicaciones();
    }, []); // Se ejecuta solo una vez al cargar la página

    // Efecto para actualizar la lista de comunas cuando se cambia la región
    useEffect(() => {
        if (selectedRegion && ubicaciones[selectedRegion]) {
          setComunasList(ubicaciones[selectedRegion]);
        } else {
          setComunasList([]);
        }
    }, [selectedRegion, ubicaciones]);
    // --- FIN DE CAMBIOS ---


    const onSubmit = handleSubmit(async (data) => {
        try {
            // --- INICIO DE CAMBIOS ---
            // Es necesario crear 'FormData' manualmente para que la imagen (imgURL)
            // y los datos anidados (ubicacion) se envíen correctamente al backend.
            const formData = new FormData();
            
            // Añadimos los campos que SÍ tenías
            formData.append('titulo', data.titulo);
            formData.append('descripcion', data.descripcion);
            formData.append('tipo', data.tipo);
            
            // 'imgURL' es el nombre del campo de archivo, 'data.imgURL[0]' es el archivo
            if (data.imgURL && data.imgURL[0]) {
                formData.append('imgURL', data.imgURL[0]);
            }
            
            // Añadimos los nuevos campos de ubicación
            formData.append('ubicacion.region', data.ubicacion.region);
            formData.append('ubicacion.comuna', data.ubicacion.comuna);
            // No se añade 'ubicacion.ciudad'

            await crearPubli(formData); // Enviamos el FormData
            // --- FIN DE CAMBIOS ---

            reset(); 
            toast.success("Publicación creada exitosamente.", {
                position: "top-right",
                autoClose: 3000, 
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } catch (error) {
            console.error("Error al crear la publicación:", error);
            toast.error("Hubo un error al crear la publicación.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    });

    return (
        <div className="min-h-screen bg-pink-50 flex flex-col items-center">
            <Header />
                <ToastContainer
                    position="top-right"
                    style={{ marginTop: "4rem" }}
                    closeOnClick
                    autoClose={3000}
                    hideProgressBar
                    pauseOnHover
                    draggable
                    theme="colored"
                />
                <form
                onSubmit={onSubmit}
                className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-10 space-y-6 m-5"
                encType="multipart/form-data"
                >
                <h2 className="text-4xl font-bold text-center text-zinc-800 mb-6">Crear Publicación</h2>

                    {/* --- Tus campos se mantienen igual --- */}
                <div>
                    <label htmlFor="titulo" className="block text-sm font-semibold text-zinc-700 mb-1 border-t">
                    Título
                    </label>
                    <input
                    type="text"
                    placeholder="Ingresa el título de la publicación"
                    required
                    {...register("titulo")}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                </div>

                <div>
                    <label htmlFor="descripcion" className="block text-sm font-semibold text-zinc-700 mb-1 border-t">
                    Descripción
                    </label>
                    <textarea
                    rows={4}
                    placeholder="Ingresa una descripción"
                    required
                    {...register("descripcion")}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                </div>

                <div>
                    <label htmlFor="imgURL" className="block text-sm font-semibold text-zinc-700 mb-1 border-t">
                    Imagen (.png)
                    </label>
                    <input
                    type="file"
                    accept="image/png"
                    required
                    {...register("imgURL")}
                    className="w-full text-sm text-zinc-600"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-zinc-700 mb-2 border-t">Tipo</label>
                    <div className="flex flex-col sm:flex-row gap-4">
                    {["rescate", "adopcion", "perdida"].map((tipo) => (
                        <label key={tipo} className="flex items-center gap-2 text-zinc-700">
                        <input
                            type="radio"
                            value={tipo}
                            {...register("tipo")}
                            className="accent-pink-500"
                            required
                        />
                       {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                        </label>
                    ))}
                    </div>
                </div>

                    {/* --- INICIO DE CAMBIOS EN UBICACIÓN --- */}
                <fieldset className="pt-6">
                    <legend className="text-lg font-semibold text-zinc-800 mb-3">Ubicación</legend>

                        {/* Se cambia a 2 columnas y se elimina "ciudad" */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                    <div>
                        <label htmlFor="region" className="block text-sm font-semibold text-zinc-700 mb-1 border-t">
                        Región
                        </label>
                        {/* Se cambia Input por Select */}
                        <select
                          id="region"
                          required
                          {...register("ubicacion.region", { required: "La región es obligatoria" })}
                          className="w-full px-4 py-3 rounded-lg bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        >
                            <option value="">Selecciona una Región</option>
                            {regionesList.map((region) => (
                                <option key={region} value={region}>{region}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="comuna" className="block text-sm font-semibold text-zinc-700 mb-1 border-t">
                        Comuna
                        </label>
                        {/* Se cambia Input por Select */}
                        <select
                          id="comuna"
                          required
                          {...register("ubicacion.comuna", { required: "La comuna es obligatoria" })}
                          className="w-full px-4 py-3 rounded-lg bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
                          disabled={!selectedRegion || comunasList.length === 0} 
                        >
                            <option value="">Selecciona una Comuna</option>
                            {comunasList.map((comuna) => (
                                <option key={comuna} value={comuna}>{comuna}</option>
                            ))}
                        </select>
                    </div>
                    </div>
                </fieldset>
                    {/* --- FIN DE CAMBIOS EN UBICACIÓN --- */}

                <div className="text-center pt-4">
                    <button
                    type="submit"
                    className="bg-pink-500 text-white font-bold px-6 py-3 rounded-xl shadow-md hover:bg-pink-600 transition"
                    >
                    Publicar
                    </button>
                </div>
                </form>
        </div>
        );
}

export default CrearPubliPage