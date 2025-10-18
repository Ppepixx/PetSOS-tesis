import { useState , useEffect} from "react";
import { useAuth } from "../context/AuthContext.jsx";
import Header from "../components/header";
import MisPubliCard from "./misPubliCardPage.jsx";

const PerfilPage = () => {
  const { user, isAuthenticated, loading, updateUser} = useAuth();
  const [showSuccess, setShowSuccess] = useState(false);  
  const [isFading, setIsFading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    direccion: '',
    telefono: '',
    fechadnacimiento: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  // Inicializar formData cuando user cambie
  useEffect(() => {
  if (user) {
    setFormData({
      username: user.username || '',
      email: user.email || '',
      direccion: user.direccion || '',
      telefono: user.telefono || '',
      fechadnacimiento: user.fechadnacimiento ? user.fechadnacimiento.split('T')[0] : ''
    });
  }
}, [user]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setMessage({ type: '', text: '' });
  };

  const handleCancel = () => {
    // Restaurar datos originales
    setFormData({
      username: user.username || '',
      email: user.email || '',
      direccion: user.direccion || '',
      telefono: user.telefono || '',
      fechadnacimiento: user.fechadnacimiento ? user.fechadnacimiento.split('T')[0] : ''
    });
    setIsEditing(false);
    setMessage({ type: '', text: '' });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('http://localhost:4000/api/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 🔑 MUY IMPORTANTE: Para enviar las cookies de autenticación
        body: JSON.stringify({
          // Los datos que quieres actualizar
          username: formData.username,
          email: formData.email,
          direccion: formData.direccion,
          telefono: formData.telefono,
          fechadnacimiento: formData.fechadnacimiento
          // ... otros campos según tu modelo de usuario
        })
      });

      if (!response.ok) {
        const errorData = await response.text(); // Para ver qué error devuelve
        throw new Error(`Error ${response.status}: ${errorData}`);
      }

      const data = await response.json();
      updateUser(data);  // Actualiza el estado global del usuario
      console.log('✅ Perfil actualizado:', data);
      setShowSuccess(true);
      setTimeout(() => setIsFading(true), 2500); // Empieza a desvanecer
      setTimeout(() => {
        setShowSuccess(false);
        setIsFading(false);
        }, 3000); // Oculta y reinicia
        setIsEditing(false);

      
    } catch (error) {
      console.error('❌ Error actualizando perfil:', error.message);
      alert('Error al actualizar el perfil: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return <div className="text-center mt-10 text-orange-600">Cargando perfil...</div>;
  }

  // Si no está autenticado, mostrar mensaje
  if (!isAuthenticated) {
    return <div className="text-center mt-10 text-red-600">Debes iniciar sesión para ver tu perfil</div>;
  }

  // Si no hay datos de usuario, mostrar mensaje
  if (!user) {
    return <div className="text-center mt-10 text-red-600">No se pudo cargar el perfil</div>;
  }

  return (
    <div className="flex-wrap min-h-screen bg-no-repeat bg-cover bg-center">
      <Header />
      {showSuccess && (
  <div className={`max-w-3xl mx-auto mb-4 px-4 transition-opacity duration-500 ${
    isFading ? "opacity-0" : "opacity-100"
  }`}>
    <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-lg shadow-md mt-4">
      ✅ Cambios guardados con éxito
    </div>
  </div>
)}
      <div className="max-w-6xl mx-auto mt-6 bg-white shadow-md rounded-2xl p-6 border-t-4 border-orange-500">
        
        {/* Header del perfil */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <div className="bg-pink-100 text-pink-600 font-bold text-2xl rounded-full w-16 h-16 flex items-center justify-center">
              {(isEditing ? formData.username : user.username)?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-pink-600">
                {isEditing ? formData.username : user.username}
              </h1>
              <p className="text-gray-600">
                {isEditing ? formData.email : user.email}
              </p>
            </div>
          </div>
          
          {/* Botones de acción */}
          <div className="flex gap-2">
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Editar Perfil
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {isSaving ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mensaje de estado */}
        {message.text && (
          <div className={`mb-4 p-3 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-red-100 text-red-700 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        {/* Campos del perfil */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Nombre de usuario */}
          <div className="bg-pink-100 rounded-xl p-4">
            <h2 className="text-pink-700 font-semibold mb-2">Nombre de usuario</h2>
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full p-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Ingresa tu nombre de usuario"
              />
            ) : (
              <p>{user.username || "No especificado"}</p>
            )}
          </div>

          {/* Email */}
          <div className="bg-pink-100 rounded-xl p-4">
            <h2 className="text-pink-700 font-semibold mb-2">Email</h2>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Ingresa tu email"
              />
            ) : (
              <p>{user.email || "No especificado"}</p>
            )}
          </div>

          {/* Dirección */}
          <div className="bg-pink-100 rounded-xl p-4">
            <h2 className="text-pink-700 font-semibold mb-2">Dirección</h2>
            {isEditing ? (
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
                className="w-full p-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Ingresa tu dirección"
              />
            ) : (
              <p>{user.direccion || "No especificada"}</p>
            )}
          </div>

          {/* Teléfono */}
          <div className="bg-pink-100 rounded-xl p-4">
            <h2 className="text-pink-700 font-semibold mb-2">Teléfono</h2>
            {isEditing ? (
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                className="w-full p-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Ingresa tu teléfono"
              />
            ) : (
              <p>{user.telefono || "No especificado"}</p>
            )}
          </div>

          {/* Fecha de nacimiento */}
          <div className="bg-pink-100 rounded-xl p-4">
            <h2 className="text-pink-700 font-semibold mb-2">Fecha de nacimiento</h2>
            {isEditing ? (
              <input
                type="date"
                name="fechadnacimiento"
                value={formData.fechadnacimiento}
                onChange={handleInputChange}
                className="w-full p-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            ) : (
              <p>{user.fechadnacimiento ? new Date(user.fechadnacimiento).toLocaleDateString() : "No especificada"}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center px-4 py-6 my-2 bg-gray-200 min-h-screen">
        <MisPubliCard/>
      </div>
    </div>
  );
}

export default PerfilPage;