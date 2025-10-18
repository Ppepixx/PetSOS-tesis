import Header from "../components/header"

const ConsejosPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-pink-50">
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-8 text-pink-700">Consejos sobre mascotas</h1>

        {/* Sección: Qué hacer si pierdes una mascota */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-pink-700 mb-4">🐾 ¿Perdiste una mascota?</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-md">
              <p className="font-semibold">1. Publica en la plataforma</p>
              <p className="text-50 text-gray-700">Crea una publicación con foto, zona donde se perdió y detalles clave como nombre, collar o chip.</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md">
              <p className="font-semibold">2. Recorre los alrededores</p>
              <p className="text-50 text-gray-700">Pregunta a vecinos, negocios y revisa cámaras de seguridad. Lleva fotos impresas o en tu celular.</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md">
              <p className="font-semibold">3. Contacta clínicas y refugios</p>
              <p className="text-50 text-gray-700">Muchos animales encontrados son llevados a veterinarias, municipios o agrupaciones de rescate.</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md">
              <p className="font-semibold">4. Usa redes sociales</p>
              <p className="text-50 text-gray-700">Publica en grupos de tu zona, etiquetando a organizaciones locales que puedan ayudar.</p>
            </div>
          </div>
        </section>

        {/* Sección: Qué hacer si encuentras una mascota */}
        <section>
          <h2 className="text-2xl font-semibold text-pink-700 mb-4">🏡 ¿Encontraste una mascota?</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-md">
              <p className="font-semibold">1. Evalúa si está herida</p>
              <p className="text-50 text-gray-700">Llévala a una veterinaria si necesita atención médica urgente. Toma fotos claras.</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md">
              <p className="font-semibold">2. Publica en la plataforma</p>
              <p className="text-50 text-gray-700">Crea una publicación indicando dónde la encontraste, su aspecto y cualquier accesorio que tenga (collar, placa, chip).</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md">
              <p className="font-semibold">3. Busca al dueño en publicaciones</p>
              <p className="text-50 text-gray-700">Revisa publicaciones de mascotas perdidas recientes, podrías encontrar coincidencias.</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md">
              <p className="font-semibold">4. No la entregues sin pruebas</p>
              <p className="text-50 text-gray-700">Asegúrate de que quien la reclama tenga fotos u otros datos que confirmen que es su mascota.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ConsejosPage
