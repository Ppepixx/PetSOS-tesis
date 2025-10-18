import { useEffect, useState } from "react";
import Header from "../components/header";

export default function Veterinarias() {
  const [map, setMap] = useState(null);
  const [veterinarias, setVeterinarias] = useState([]);
  const [posicion, setPosicion] = useState(null);

  // Obtener ubicación del usuario
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const ubicacion = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setPosicion(ubicacion);
          initMap(ubicacion);
        },
        () => alert("No se pudo obtener tu ubicación 😢")
      );
    }
  }, []);

  // Inicializar Google Maps con Places API
  const initMap = (ubicacion) => {
    const mapInstance = new window.google.maps.Map(
      document.getElementById("map"),
      {
        center: ubicacion,
        zoom: 14,
      }
    );

    setMap(mapInstance);

    // marcador de tu ubicación
    new window.google.maps.Marker({
      map: mapInstance,
      position: ubicacion,
      title: "Tu ubicación",
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      },
    });

    const service = new window.google.maps.places.PlacesService(mapInstance);

    service.nearbySearch(
      {
        location: ubicacion,
        radius: 3000,
        type: "veterinary_care",
      },
      (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setVeterinarias(results);

          results.forEach((place) => {
            new window.google.maps.Marker({
              map: mapInstance,
              position: place.geometry.location,
              title: place.name,
            });
          });
        }
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-white">
      <Header />

      {/* Hero */}
      <section className="bg-pink-200 py-16 text-center shadow-inner border-b border-pink-300">
        <h2 className="text-4xl font-extrabold text-pink-700 mb-4 tracking-wide drop-shadow-md">
          🐾 Encuentra veterinarias cerca de ti
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-6 text-pink-800 font-medium">
          Localiza clínicas y centros veterinarios en tu zona para cuidar de tu
          mascota.
        </p>
      </section>

      {/* Contenido */}
      <section className="py-12 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Listado */}
        <div className="bg-white rounded-2xl shadow-xl p-6 overflow-y-auto h-[500px]">
          <h3 className="text-2xl font-bold text-pink-700 mb-6 text-center">
            Listado de Veterinarias
          </h3>
          {veterinarias.length === 0 ? (
            <p className="text-gray-600 text-center">
              No se encontraron veterinarias cercanas.
            </p>
          ) : (
            <ul className="space-y-4">
              {veterinarias.map((v, index) => (
                <li
                  key={index}
                  className="p-4 border rounded-xl hover:bg-pink-50 transition cursor-default"
                >
                  <h4 className="font-bold text-pink-700">{v.name}</h4>
                  <p className="text-sm text-gray-600">{v.vicinity}</p>
                  {v.rating && (
                    <p className="text-yellow-600">⭐ {v.rating}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Mapa */}
        <div
          id="map"
          className="w-full h-[500px] rounded-2xl shadow-xl border border-pink-200"
        ></div>
      </section>
    </div>
  );
}
