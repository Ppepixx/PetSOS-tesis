import Header from "../components/Header";

const FaqPage = () => {
  return (
    <div className="min-h-screen bg-orange-50">
      <Header />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-orange-900 mb-10 text-center">
          Preguntas Frecuentes
        </h1>

        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-400">
            <h2 className="text-xl font-semibold text-orange-800 mb-2">
              ¿Puedo cambiar mis datos personales después de registrarme?
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Si, debes ingresar a tu perfil, selecciona la opción “Editar perfil”, edita tu nombre o dirección y luego guarda los cambios.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-400">
            <h2 className="text-xl font-semibold text-orange-800 mb-2">
              ¿Cómo puedo publicar sobre una mascota perdida o en adopción?
            </h2>
            <p className="text-gray-700 leading-relaxed">
              En la sección de publicaciones, haz clic en “Crear publicación”. Debes completar todos los campos requeridos y subir al menos una imagen.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-400">
            <h2 className="text-xl font-semibold text-orange-800 mb-2">
              ¿Puedo editar una publicación que ya hice?  
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Sí, pero solo si eres el autor de la publicación. Puedes actualizar la descripción, imágen y/o ubicación.
            </p>
          </div>  

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-400">
            <h2 className="text-xl font-semibold text-orange-800 mb-2">
              ¿Puedo comentar en las publicaciones?
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Sí, si estás registrado puedes dejar comentarios en cualquier publicación o incluso puedes contactarte con el usuario.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-400">
            <h2 className="text-xl font-semibold text-orange-800 mb-2">
              ¿Cómo puedo adoptar una mascota desde la plataforma?
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Puedes visitar la sección de "Adoptar". Allí encontrarás publicaciones de mascotas disponibles. Selecciona la que te interese y sigue las instrucciones de contacto del dueño o del refugio responsable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
