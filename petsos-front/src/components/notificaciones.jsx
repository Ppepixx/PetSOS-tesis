import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerNotificaciones , eliminarNotificacion } from "../api/notificaciones";
import { useAuth } from "../context/AuthContext.jsx";

function Notificaciones() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [notificaciones, setNotificaciones] = useState([]);
  const [mostrarLista, setMostrarLista] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotificaciones = async () => {
      if (!token) return;
      
      setLoading(true);
      try {
        const data = await obtenerNotificaciones(token);
        console.log('Notificaciones recibidas:', data);
        setNotificaciones(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al obtener notificaciones:", error);
        setNotificaciones([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotificaciones();
  }, [token]);

  const notificacionesNoLeidas = notificaciones.filter(n => !n.leido).length;

  const manejarClickNotificacion = (link) => {
    if (link) {
      setMostrarLista(false);
      navigate(link);
    }
  };

  const formatearTiempo = (fecha) => {
    const now = new Date();
    const fechaNotif = new Date(fecha);
    const diffMs = now - fechaNotif;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Ahora";
    if (diffMins < 60) return `${diffMins} min`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return fechaNotif.toLocaleDateString();
  };

  const getIconoTipo = (mensaje) => {
    if (mensaje.includes("comentado")) return "💬";
    if (mensaje.includes("adoptado")) return "🏠";
    if (mensaje.includes("rescatado")) return "❤️";
    return "🔔";
  };

  return (
    <div className="relative">
      {/* Botón de notificaciones */}
      <button
        onClick={() => setMostrarLista(!mostrarLista)}
        className="relative group flex items-center justify-center w-10 h-10 bg-gradient-to-r from-pink-100 to-rose-100 hover:from-pink-200 hover:to-rose-200 rounded-full transition-all duration-300 border border-pink-200 shadow-sm hover:shadow-md"
      >
        <span className="text-xl group-hover:scale-110 transition-transform duration-200">
          🔔
        </span>
        {notificacionesNoLeidas > 0 && (
          <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse">
            {notificacionesNoLeidas > 9 ? '9+' : notificacionesNoLeidas}
          </span>
        )}
      </button>

      {/* Dropdown de notificaciones */}
      {mostrarLista && (
        <>
          {/* Overlay para cerrar al hacer click fuera */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setMostrarLista(false)}
          />
          
          <div className="absolute right-0 mt-3 w-96 bg-white border border-pink-100 shadow-2xl rounded-2xl z-50 max-h-96 overflow-hidden animate-in slide-in-from-top-2 duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 px-4 py-3 border-b border-pink-100">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-pink-500">🔔</span>
                  Notificaciones
                </h3>
                {notificacionesNoLeidas > 0 && (
                  <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full font-medium">
                    {notificacionesNoLeidas} nuevas
                  </span>
                )}
              </div>
            </div>

            {/* Contenido */}
            <div className="max-h-80 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="flex items-center gap-2 text-pink-500">
                    <div className="w-4 h-4 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm">Cargando...</span>
                  </div>
                </div>
              ) : notificaciones.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4">
                  <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mb-3">
                    <span className="text-2xl">📭</span>
                  </div>
                  <p className="text-gray-500 text-sm text-center">
                    No tienes notificaciones aún
                  </p>
                  <p className="text-gray-400 text-xs text-center mt-1">
                    Te avisaremos cuando alguien interactúe contigo
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-pink-50">
                  {notificaciones.map((n, index) => (
  <div
    key={n._id || index}
    className={`group px-4 py-3 hover:bg-gradient-to-r hover:from-pink-25 hover:to-rose-25 transition-all duration-200 cursor-pointer relative ${
      !n.leido ? 'bg-pink-25 border-l-4 border-l-pink-400' : ''
    }`}
  >
    <div className="flex items-start gap-3">
      {/* Avatar/Icono */}
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg ${
        !n.leido 
          ? 'bg-gradient-to-r from-pink-100 to-rose-100' 
          : 'bg-gray-100'
      }`}>
        {getIconoTipo(n.mensaje)}
      </div>

      {/* Contenido */}
      <div className="flex-1 min-w-0" onClick={() => manejarClickNotificacion(n.link)}>
        <div className="flex items-center gap-2 mb-1">
          <span className={`font-semibold text-sm ${
            !n.leido ? 'text-gray-900' : 'text-gray-600'
          }`}>
            {n.emisor?.username || 'Usuario'}
          </span>
          {!n.leido && (
            <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
          )}
        </div>
        
        <p className={`text-sm leading-relaxed ${
          !n.leido ? 'text-gray-700' : 'text-gray-500'
        }`}>
          {n.mensaje}
        </p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-400">
            {formatearTiempo(n.fecha)}
          </span>
          {n.link && (
            <span className="text-xs text-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1">
              Ver más <span>→</span>
            </span>
          )}
        </div>
      </div>
    </div>

    {/* Botón eliminar */}
    <button
      onClick={async () => {
        try {
          await eliminarNotificacion(token, n._id);
          setNotificaciones(prev => prev.filter(item => item._id !== n._id));
        } catch (error) {
          console.error("Error al eliminar notificación:", error);
        }
      }}
      className="absolute top-2 right-2 text-xs text-rose-400 hover:text-rose-600 transition-colors duration-200"
      title="Eliminar notificación"
    >
      ✖
    </button>
  </div>
))}

                </div>
              )}
            </div>

            {/* Footer - opcional */}
            {notificaciones.length > 0 && (
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 px-4 py-3 border-t border-pink-100">
                <button 
                  className="w-full text-center text-sm text-pink-600 hover:text-pink-700 font-medium transition-colors duration-200"
                  onClick={() => {
                    setMostrarLista(false);
                    // Aquí podrías navegar a una página de todas las notificaciones
                  }}
                >
                  Ver todas las notificaciones
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Notificaciones;