import { useForm } from "react-hook-form"
import Header from "../components/header.jsx"
import { usePubli } from "../context/PublicacionContext.jsx"


const CrearPubliPage = ()=>{
    const { register, handleSubmit, reset } = useForm();
    const { crearPubli } = usePubli();


    const onSubmit = handleSubmit(async (data) => {
        try {
            await crearPubli(data); 
            reset(); 
            toast.success("Producto creado exitosamente.", {
                position: "top-right",
                autoClose: 3000, 
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } catch (error) {
            console.error("Error al agregar el producto:", error);
            toast.error("Hubo un error al agregar el producto.", {
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
        <div className="min-h-screen bg-orange-50 flex flex-col items-center">
            <Header />
            <form
            onSubmit={onSubmit}
            className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-10 space-y-6 m-5"
            >
            <h2 className="text-4xl font-bold text-center text-zinc-800 mb-6">Crear Publicación</h2>

            <div>
                <label htmlFor="titulo" className="block text-sm font-semibold text-zinc-700 mb-1">
                Título
                </label>
                <input
                type="text"
                placeholder="Ingresa el título de la publicación"
                {...register("titulo")}
                className="w-full px-4 py-3 rounded-lg bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
            </div>

            <div>
                <label htmlFor="descripcion" className="block text-sm font-semibold text-zinc-700 mb-1">
                Descripción
                </label>
                <textarea
                rows={4}
                placeholder="Ingresa una descripción"
                {...register("descripcion")}
                className="w-full px-4 py-3 rounded-lg bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
            </div>

            <div>
                <label htmlFor="imgURL" className="block text-sm font-semibold text-zinc-700 mb-1">
                Imagen (.png)
                </label>
                <input
                type="file"
                accept="image/png"
                {...register("imgURL")}
                className="w-full text-sm text-zinc-600"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-2">Tipo</label>
                <div className="flex flex-col sm:flex-row gap-4">
                {["rescate", "adopcion", "perdida"].map((tipo) => (
                    <label key={tipo} className="flex items-center gap-2 text-zinc-700">
                    <input
                        type="radio"
                        value={tipo}
                        {...register("tipo")}
                        className="accent-orange-500"
                    />
                    {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                    </label>
                ))}
                </div>
            </div>

            <fieldset className="border-t pt-6">
                <legend className="text-lg font-semibold text-zinc-800 mb-4">Ubicación</legend>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label htmlFor="region" className="block text-sm font-semibold text-zinc-700 mb-1">
                    Región
                    </label>
                    <input
                    type="text"
                    id="region"
                    placeholder="Ej: Metropolitana"
                    {...register("ubicacion.region")}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>

                <div>
                    <label htmlFor="ciudad" className="block text-sm font-semibold text-zinc-700 mb-1">
                    Ciudad
                    </label>
                    <input
                    type="text"
                    id="ciudad"
                    placeholder="Ej: Santiago"
                    {...register("ubicacion.ciudad")}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>

                <div>
                    <label htmlFor="comuna" className="block text-sm font-semibold text-zinc-700 mb-1">
                    Comuna
                    </label>
                    <input
                    type="text"
                    id="comuna"
                    placeholder="Ej: La Florida"
                    {...register("ubicacion.comuna")}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>
                </div>
            </fieldset>

            {/* Botón */}
            <div className="text-center pt-4">
                <button
                type="submit"
                className="bg-orange-500 text-white font-bold px-6 py-3 rounded-xl shadow-md hover:bg-orange-600 transition"
                >
                Publicar
                </button>
            </div>
            </form>
        </div>
        );
}

export default CrearPubliPage