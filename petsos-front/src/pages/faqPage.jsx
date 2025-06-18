import { useState } from "react";
import Header from "../components/Header";

const faqsData = [
  {
    category: "Publicaciones",
    questions: [
      {
        q: "¿Cómo puedo publicar sobre una mascota perdida o en adopción?",
        a:
          "En la sección de publicaciones, haz clic en “Crear publicación”. Debes completar todos los campos requeridos y subir al menos una imagen.",
      },
      {
        q: "¿Puedo editar una publicación que ya hice?",
        a:
          "Sí, para editar tu publicación debes ir a tu perfil, pero solo si eres el autor de la publicación. Puedes actualizar la descripción, imagen y/o ubicación.",
      },
      {
        q: "¿Puedo eliminar una publicación?",
        a:
          "Solo el autor puede eliminar su publicación desde la vista de detalle de la misma en el perfil.",
      },
      {
        q: "¿Hay un límite de publicaciones que puedo hacer?",
        a: "No hay límite, pero se recomienda publicar solo mascotas reales para evitar spam.",
      },
    ],
  },
  {
    category: "Adoptar",
    questions: [
      {
        q: "¿Cómo puedo adoptar una mascota desde la plataforma?",
        a:
          'Puedes visitar la sección de "Adoptar". Allí encontrarás publicaciones de mascotas disponibles. Selecciona la que te interese y sigue las instrucciones de contacto del dueño o del refugio responsable.',
      },
      {
        q: "¿Qué debo hacer si quiero adoptar una mascota?",
        a:
          "Contacta al dueño o refugio mediante la información en la publicación y sigue el proceso que te indiquen.",
      },
      {
        q: "¿Debo pagar algo para adoptar?",
        a:
          "La mayoría de las adopciones son gratuitas, pero algunos refugios pueden solicitar una donación voluntaria para cuidados.",
      },
      {
         q: "¿Qué requisitos debo cumplir para adoptar una mascota?",
         a: "Cada dueño o refugio puede tener sus propios requisitos, como residencia estable o compromiso de cuidado responsable.",
      },
      {
        q: "¿Qué hago si quiero devolver una mascota adoptada?",
        a: "Se recomienda contactar al refugio o dueño para gestionar una devolución responsable.",
      },
      {
        q: "¿Puedo adoptar mascotas de cualquier raza o edad?",
        a: "Sí, la plataforma incluye mascotas de diferentes edades, razas y tamaños.",
      },
      {
        q: "¿Cómo sé si una mascota está realmente disponible para adopción?",
        a: "Solo se muestran mascotas activas en adopción; sin embargo, recomendamos confirmar con el contacto antes de realizar trámites.",
      },
    ],
  },
  {
    category: "Pérdida",
    questions: [
      {
        q: "¿Qué hago si pierdo a mi mascota?",
        a:
          "Publica un aviso en la sección “Mascotas perdidas” con foto, características y lugar donde la viste por última vez.",
      },
      {
        q: "¿Recibo notificaciones si encuentran una mascota similar a la mía?",
        a:
          "Sí, te llega una notificación en tu buzón cuando te hayan comentado tu publicación .",
      },
      {
        q: "¿Puedo editar la información de una publicación de mascota perdida?",
        a: "Sí, si eres el autor puedes editar cualquier dato de tu publicación en tu perfil.",
      },
      {
        q: "¿Puedo reportar si encontré una mascota perdida?",
        a: "Sí, puedes crear una publicación en la opción “Rescate” para ayudar a devolverla.",
      },
    ],
  },
  {
    category: "Publicar adopción",
    questions: [
      {
        q: "¿Cómo publico una mascota para adopción?",
        a:
          "En la sección “Publicar adopción”, completa el formulario con los datos de la mascota, fotos, y condiciones de adopción.",
      },
      {
        q: "¿Qué información es obligatoria para publicar una adopción?",
        a: "Debes incluir al menos foto, descripción, edad, estado de salud y condiciones para la adopción.",
      },
      {
        q: "¿Puedo modificar o eliminar una publicación de adopción?",
        a: "Sí, el autor puede editar o eliminar su publicación en cualquier momento desde el perfil.",
      },    
    ],
  },
  {
    category: "Información general y uso de la plataforma",
    questions: [
      {
        q: "¿Es necesario iniciar sesión para usar la plataforma?",
        a:
          "Sí, para navegar y usar la plataforma debes iniciar sesión con tu cuenta. Esto permite un mejor control y seguridad.",
      },
      {
        q: "¿Puedo cambiar mis datos personales después de registrarme?",
        a:
          "Si, puedes editar tus datos personales en tu perfil",
      },
      {
        q: "¿La plataforma es gratuita?",
        a: "Sí, el uso de la plataforma es completamente gratuito para los usuarios registrados.",
      },
      {
        q: "¿La plataforma garantiza la seguridad de mis datos?",
        a: "Implementamos medidas de seguridad para proteger tus datos, pero recomendamos no compartir información sensible.",
      },
    ],
  },
  {
    category: "Interacción y moderación",
    questions: [
      {
        q: "¿Puedo comentar en las publicaciones?",
        a: "Sí, si estás registrado puedes dejar comentarios en cualquier publicación para compartir información o hacer preguntas.",
      },
      {
        q: "¿Puedo darle like a los comentarios?",
        a: "Sí, puedes darle like a los comentarios que consideres útiles o importantes.",
      },
      {
        q: "¿Cómo reporto una publicación inapropiada?",
        a: "Cada publicación tiene un botón para reportar contenido inapropiado, que será revisado por el equipo.",
      },
      {
        q: "¿Puedo reportar comentarios ofensivos o spam?",
        a: "Sí, los comentarios también pueden ser reportados para mantener la comunidad segura y amigable.",
      },
    ],
  }
];

const FaqPage = () => {
  const [openCategoryIndex, setOpenCategoryIndex] = useState(null);

  const toggleCategory = (index) => {
    if (openCategoryIndex === index) {
      setOpenCategoryIndex(null);
    } else {
      setOpenCategoryIndex(index);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50">
      <Header />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-orange-900 mb-10 text-center">
          Preguntas Frecuentes
        </h1>

        <div className="space-y-6">
          {faqsData.map((categoryItem, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md border-l-4 border-orange-400"
            >
              <button
                className="w-full text-left px-6 py-4 font-semibold text-orange-800 text-xl flex justify-between items-center focus:outline-none"
                onClick={() => toggleCategory(idx)}
                aria-expanded={openCategoryIndex === idx}
                aria-controls={`faq-category-${idx}`}
              >
                {categoryItem.category}
                <span className="text-orange-600 text-2xl select-none">
                  {openCategoryIndex === idx ? "−" : "+"}
                </span>
              </button>

              {openCategoryIndex === idx && (
                <div id={`faq-category-${idx}`} className="px-6 pb-6 space-y-4">
                  {categoryItem.questions.map((item, qIdx) => (
                    <div
                      key={qIdx}
                      className="p-4 rounded-md bg-orange-50 border border-orange-300"
                    >
                      <h2 className="text-xl font-semibold text-orange-800 mb-2">
                        {item.q}
                      </h2>
                      <p className="text-gray-700 leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
